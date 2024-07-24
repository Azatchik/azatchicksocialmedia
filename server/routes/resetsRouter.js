import Router from 'express';
import resetsController from "../controllers/resetsController.js";
import getMethodsResetValidate from "../middlewares/getMethodsResetValidate.js";
import resetPasswordVerifyValidate from "../middlewares/resetPasswordVerifyValidate.js";
import resetPasswordSetPasswordValidate from "../middlewares/resetPasswordSetPasswordValidate.js";
const resetsRouter = new Router();

resetsRouter.post('/get-methods',
    getMethodsResetValidate,
    resetsController.getMethods,
);
resetsRouter.post('/get-code',
    resetsController.getCode,
);
resetsRouter.post('/verify',
    resetPasswordVerifyValidate,
    resetsController.resetVerify,
);
resetsRouter.post('/set-password',
    resetPasswordSetPasswordValidate,
    resetsController.setPassword,
);

export default resetsRouter;
