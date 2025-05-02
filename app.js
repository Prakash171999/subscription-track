import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import apiLimiter from "./middlewares/limit.middleware.js";

const app = express();

app.use(express.json()); // Parse JSON request bodies and attach them to req.body
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies sent via HTML forms in a simple format
app.use(cookieParser()); // Reads cookies from incoming requests, so the app can store user data
app.use(apiLimiter);

// middleware -> which route you wanna use.
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server! After long time.");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
