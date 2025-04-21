import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", (req, res, next) => {
  signup(req, res, next);
});

authRouter.post("/sign-in", (req, res, next) => {
  signin(req, res, next);
});

authRouter.post("/sign-out", (req, res) => {
  signout();
});

export default authRouter;
