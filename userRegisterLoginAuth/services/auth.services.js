import { eq, lt, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { sessionsTables, usersTable, verifyEmailTokensTable } from "../drizzle/schema.js";
// import bcrypt from "bcryptjs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { log } from "console";

export const getUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return user;
}

export const createUser = async ({ name, age, email, password }) => {
  return await db.insert(usersTable)
    .values({ name, age, email, password })
    .$returningId();
}

export const hashPassword = async (password) => {
  // return await bcrypt.hash(password, 10)
  return await argon2.hash(password)
}

export const comparePassword = async (password, hash) => {
  // return await bcrypt.compare(password, hash);
  return await argon2.verify(hash, password);
}

// export const generateToken = ({ id, name, email }) => {
//   return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

//createSession
export const createSession = async (userId, { ip, userAgent }) => {
  const [session] = await db.insert(sessionsTables)
    .values({ userId, ip, userAgent })
    .$returningId();

  return session;
};

// createAccessToken
export const createAccessToken = ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "15m",
  });
};

// createAccessToken
export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "1w",
  });
};

// verify JWT Token
export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//findSessionById
export const findSessionById = async (sessionId) => {
  const [session] = await db.select().from(sessionsTables)
    .where(eq(sessionsTables.id, sessionId));
  return session;
}

// findUserById
export const findUserById = async (userId) => {
  const [user] = await db.select().from(usersTable)
    .where(eq(usersTable.id, userId));
  return user;
}

//refreshTokens
export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    const curruntSession = await findSessionById(decodedToken.sessionId)

    if (!curruntSession || !curruntSession.valid) {
      throw new Error("Invalid Session");
    }

    const user = await findUserById(curruntSession.userId);
    if (!user) throw new Error("Invalid User");

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      sessionId: curruntSession.id,
    }

    const newAccessToken = createAccessToken(userInfo);
    const newRefreshToken = createRefreshToken(curruntSession.id)

    return {
      newAccessToken,
      newRefreshToken,
      user: userInfo,
    };

  } catch (error) {
    console.error(error.message)
  }

};

//clearUserSession
export const clearUserSession = (sessionId) => {
  return db.delete(sessionsTables).where(eq(sessionsTables.id, sessionId));
}

export const authenticateUser = async ({ req, res, user, name, email }) => {
  // we need to create a sessions
  const session = await createSession(user.id, {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
  })

  const accessToken = createAccessToken({
    id: user.id,
    name: user.name || name,
    email: user.email || email,
    isEmailValid: false,
    sessionId: session.id,
  })

  const refreshToken = createRefreshToken(session.id)

  const baseConfig = { httpOnly: true, secure: true };

  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });
}

// generateRandomToken
export const generateRandomToken = (digit = 8) => {
  const min = 10 ** (digit - 1); // 10000000
  const max = 10 ** digit; // 100000000

  return crypto.randomInt(min, max).toString();
}

// insertVerifyEmailToken
export const insertVerifyEmailToken = async ({ userId, token }) => {

  return db.transaction(async (tx) => {

    try {
      await tx.delete(verifyEmailTokensTable)
        .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

      // verifyEmailTokensTable check data userID in presint to delete all matching data
      await tx.delete(verifyEmailTokensTable)
        .where(lt(verifyEmailTokensTable.userId, userId));

      // insert Data in verifyEmailTokensTable
      await tx.insert(verifyEmailTokensTable).values({ userId, token });

    } catch (error) {
      console.log("verify Email Tokens error", error);
    }

  })
}

// createVerifyEmailLink
export const createVerifyEmailLink = async ({ email, token }) => {
  const uriEncodedEmail = encodeURIComponent(email);
  return `${process.env.FRONTEND_URL}/verify-email-token?token=${token}&email=${uriEncodedEmail}`
}
