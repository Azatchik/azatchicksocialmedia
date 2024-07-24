import Router from 'express';
import authenticationsController from '../controllers/authenticationsController.js'
import checkIP from "../middlewares/checkIP.js";
import config from "../config.js";
import authenticationValidate from "../middlewares/authenticationValidate.js";
const authenticationsRouter = new Router();

authenticationsRouter.post('/authenticate',
    authenticationValidate,
    authenticationsController.createAuthentication,
);
authenticationsRouter.post('/verify',
    authenticationValidate,
    authenticationsController.verifyAuthentication,
);

export default authenticationsRouter;
