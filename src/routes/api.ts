import { Router } from "express";
import authRoutes from "./auth-routes";
import { authMw } from "./middleware";
import userRoutes from "./user-routes";

// **** Init **** //
const apiRouter = Router();

// **** Setup auth routes **** //
const authRouter = Router();
authRouter.post(authRoutes.paths.login, authRoutes.login);
apiRouter.use(authRoutes.paths.basePath, authRouter);

// **** Setup auth routes **** //
const userRouter = Router();
userRouter.post(userRoutes.paths.add, userRoutes.addUser);
userRouter.post(userRoutes.paths.remove, userRoutes.removeUser);
apiRouter.use(authRoutes.paths.basePath, authMw, userRouter);

// **** Export default **** //
export default apiRouter;
