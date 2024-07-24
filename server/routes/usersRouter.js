import Router from 'express';
import usersController from "../controllers/usersController.js";
import userConfirmValidate from "../middlewares/userConfirmValidate.js";
import authorizationValidate from "../middlewares/authorizationValidate.js";
import checkIP from "../middlewares/checkIP.js";
import config from "../config.js";
const usersRouter = new Router();

usersRouter.post('/confirm',
    userConfirmValidate,
    usersController.userConfirm,
);
usersRouter.post('/authorization',
    authorizationValidate,
    usersController.authorization,
);
usersRouter.post('/updateAuthorization',
    usersController.updateAuthorization,
);

export default usersRouter;
