import { Router } from "express";

import { adminMw, validate } from "./middleware";
import User from "@models/user-model";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";

// **** Init **** //

const apiRouter = Router();

// **** Setup auth routes **** //

const authRouter = Router();

// Create user
authRouter.post(authRoutes.paths.create, authRoutes.createUser);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);

/* 
// Login user
authRouter.post(
  authRoutes.paths.login,
  validate("email", "password"),
  authRoutes.login
);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);


// **** Setup user routes **** //

const userRouter = Router();

// Get all users
userRouter.get(userRoutes.paths.get, userRoutes.getAll);

// Add one user
userRouter.post(
  userRoutes.paths.add,
  validate(["user", User.instanceOf]),
  userRoutes.add
);

// Update one user
userRouter.put(
  userRoutes.paths.update,
  validate(["user", User.instanceOf]),
  userRoutes.update
);

// Delete one user
userRouter.delete(
  userRoutes.paths.delete,
  validate(["id", "number", "params"]),
  userRoutes.delete
);
*/
// Add userRouter
// apiRouter.use(userRoutes.paths.basePath, adminMw, userRouter);

// **** Export default **** //

export default apiRouter;
