import express from "express";
import { homeRoutes } from "./routes/home.routes.js";
import { authRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js"
import { productRoute } from "./routes/product.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(cookieParser());

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());

// This must be after cookieParser middleware.
app.use(verifyAuthentication);

app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

// express router

app.use(authRoute);
app.use(homeRoutes);
app.use(productRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
