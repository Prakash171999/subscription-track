import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controlller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize ,getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "CREATE a new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE a user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE a user" });
});

export default userRouter;
