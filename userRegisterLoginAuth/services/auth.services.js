import { and, eq, gte, isNull, lt, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { oauthAccountsTable, passwordResetTokensTable, sessionsTables, usersTable, verifyEmailTokensTable } from "../drizzle/schema.js";
// import bcrypt from "bcryptjs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { log } from "console";
// import { sendEmail } from "../lib/nodemailer.js";
import path from "path";
import fs from "fs/promises";
import mjml2html from "mjml";
import ejs from "ejs";
import { sendEmail } from "../lib/send-email.js";

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

// updateUserByName
export const updateUserByName = async ({ userId, name, avatarUrl }) => {
  return await db.update(usersTable)
    .set({ name, avatarUrl })
    .where(eq(usersTable.id, userId));
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
export const insertVerifyEmailToken = ({ userId, token }) => {

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
      console.error("verify Email Tokens error", error);
    }

  })
}

// createVerifyEmailLink
// export const createVerifyEmailLink = async ({ email, token }) => {
//   const uriEncodedEmail = encodeURIComponent(email);
//   return `${process.env.FRONTEND_URL}/verify-email-token?token=${token}&email=${uriEncodedEmail}`
// }

// Updated Function createVerifyEmailLink 
export const createVerifyEmailLink = async ({ email, token }) => {

  const url = new URL(`${process.env.FRONTEND_URL}/verify-email-token`);

  url.searchParams.append("token", token);
  url.searchParams.append("email", email);

  return url.toString();
}

// findVerificationEmailToken
// export const findVerificationEmailToken = async ({ email, token }) => {

//   const tokenData = await db.select({
//     userId: verifyEmailTokensTable.userId,
//     token: verifyEmailTokensTable.token,
//     expiresAt: verifyEmailTokensTable.expiresAt,
//   }).from(verifyEmailTokensTable)
//     .where(
//       and(
//         eq(verifyEmailTokensTable.token, token),
//         gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
//       )
//     );

//   if (!tokenData.length) {
//     return null;
//   }

//   const { userId } = tokenData[0];

//   const userData = await db.select({
//     userId: usersTable.id,
//     email: usersTable.email,
//   }).from(usersTable).where(eq(usersTable.id, userId))

//   if (!userData.length) {
//     return null;
//   }

//   return {
//     userId: userData[0].userId,
//     email: userData[0].email,
//     token: userData[0].token,
//     expiresAt: userData[0].expiresAt,
//   };
// }

// findVerificationEmailToken
export const findVerificationEmailToken = async ({ email, token }) => {

  return db.select({
    // userId: verifyEmailTokensTable.userId,
    token: verifyEmailTokensTable.token,
    expiresAt: verifyEmailTokensTable.expiresAt,
    userId: usersTable.id,
    email: usersTable.email,
  }).from(verifyEmailTokensTable)
    .where(
      and(
        eq(verifyEmailTokensTable.token, token),
        (eq(usersTable.email, email)),
        gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
      )
    ).innerJoin(usersTable, eq(verifyEmailTokensTable.userId, usersTable.id))

  if (!tokenData.length) {
    return null;
  }

}

// verifyUserEmailAndUpdate
export const verifyUserEmailAndUpdate = async (email) => {
  return db.update(usersTable).set({ isEmailValid: true }).where(eq(usersTable.email, email))
}

// clearVerifyEmailToken
export const clearVerifyEmailToken = async (userId) => {
  // const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))

  return await db.delete(verifyEmailTokensTable).where(eq(verifyEmailTokensTable.userId, userId));
}

// sendNewVerifyEmailLink
export const sendNewVerifyEmailLink = async ({ userId, email }) => {
  const randomToken = generateRandomToken();

  await insertVerifyEmailToken({ userId, token: randomToken })

  const verifyEmailLink = await createVerifyEmailLink({
    email,
    token: randomToken,
  })

  // 1. to get the file data
  const mjmlTemplate = await fs.readFile(
    path.join(import.meta.dirname, "..", "emails", "verify-email.mjml"),
    "utf-8"
  );

  // 2. to replace the placeholders with the actual values
  const filledTemplate = ejs.render(mjmlTemplate, {
    code: randomToken,
    link: verifyEmailLink,
  })

  // 3. to convert mjml to html
  const htmlOutput = mjml2html(filledTemplate).html;

  sendEmail({
    to: email,
    subject: "Verify your email", // Subject line
    // text: "Hello world?", // plain text body
    html: htmlOutput, // html body
  }).catch(console.error);

}

// updateUserPassword
export const updateUserPassword = async ({ userId, newPassword }) => {
  // Convert newPassword to newHashPassword
  const newHashPassword = await hashPassword(newPassword);

  // Update Password 
  return await db.update(usersTable).set({ password: newHashPassword }).where(eq(usersTable.id, userId))
}

// findUserByEmail
export const findUserByEmail = async (email) => {
  const [user] = await db.select().from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
}

// createResetPasswordLink
export const createResetPasswordLink = async ({ userId }) => {
  const randomToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(randomToken).digest("hex");

  // Delete Maching Token
  await db.delete(passwordResetTokensTable)
    .where(eq(passwordResetTokensTable.userId, userId));

  await db.insert(passwordResetTokensTable).values({ userId, tokenHash })

  return `${process.env.FRONTEND_URL}/reset-password/${randomToken}`;

}

// getResetPasswordToken
export const getResetPasswordToken = async (token) => {

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const [data] = await db.select().from(passwordResetTokensTable)
    .where(
      and(
        eq(passwordResetTokensTable.tokenHash, tokenHash),
        gte(passwordResetTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
      )
    )

  return data;
}

// clearResetPasswordToken
export const clearResetPasswordToken = async (userId) => {
  // Delete Maching Token
  return await db.delete(passwordResetTokensTable)
    .where(eq(passwordResetTokensTable.userId, userId));
}

export async function getUserWithOauthId({ email, provider }) {
  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      isEmailValid: usersTable.isEmailValid,
      providerAccountId: oauthAccountsTable.providerAccountId,
      provider: oauthAccountsTable.provider,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .leftJoin(
      oauthAccountsTable,
      and(
        eq(oauthAccountsTable.provider, provider),
        eq(oauthAccountsTable.userId, usersTable.id)
      )
    );

  return user;
}

export async function linkUserWithOauth({
  userId,
  provider,
  providerAccountId,
  avatarUrl
}) {
  await db.insert(oauthAccountsTable).values({
    userId,
    provider,
    providerAccountId,
  });

  if (avatarUrl) {
    await db
      .update(usersTable)
      .set({ avatarUrl })
      .where(and(eq(usersTable.id, userId), isNull(usersTable.avatarUrl)))
  }
}

export async function createUserWithOauth({
  name,
  email,
  provider,
  providerAccountId,
  avatarUrl,
}) {
  const user = await db.transaction(async (trx) => {
    const [user] = await trx
      .insert(usersTable)
      .values({
        email,
        name,
        age: "00",
        // password: "",
        avatarUrl,
        isEmailValid: true, // we know that google's email are valid
      })
      .$returningId();

    await trx.insert(oauthAccountsTable).values({
      provider,
      providerAccountId,
      userId: user.id,
    });

    return {
      id: user.id,
      name,
      email,
      isEmailValid: true, // not necessary
      provider,
      providerAccountId,
    };
  });

  return user;
}