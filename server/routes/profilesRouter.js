import Router from 'express';
import profilesController from "../controllers/profilesController.js";
import createProfileValidate from "../middlewares/createProfileValidate.js";
import checkIP from "../middlewares/checkIP.js";
import config from "../config.js";
const profilesRouter = new Router();

profilesRouter.post('/create',
    createProfileValidate,
    profilesController.createProfile,
);
profilesRouter.post('/get-profile',
    profilesController.getProfile,
);

profilesRouter.post('/get-followers',
    profilesController.getFollowers,
);

profilesRouter.post('/get-subscriptions',
    profilesController.getSubscriptions,
);

profilesRouter.post('/subscribe',
    profilesController.subscribe,
);

profilesRouter.post('/unsubscribe',
    profilesController.unsubscribe,
);

profilesRouter.post('/upload-image',
    profilesController.uploadImage,
);

profilesRouter.post('/delete-images',
    profilesController.deleteProfileImages,
);

profilesRouter.post('/set-avatar',
    profilesController.setAvatar,
);

profilesRouter.post('/upload-header',
    profilesController.uploadHeader,
);

profilesRouter.post('/delete-header',
    profilesController.deleteHeader,
);
profilesRouter.post('/upload-avatar',
    profilesController.uploadAvatar,
);
profilesRouter.post('/delete-avatar',
    profilesController.deleteAvatar,
);

profilesRouter.post('/edit-profile',
    profilesController.editProfile,
);

profilesRouter.post('/add-music',
    profilesController.addMusic,
);

profilesRouter.post('/delete-music',
    profilesController.deleteMusic,
);

profilesRouter.post('/get-subscribe-recommendations',
    profilesController.getSubscribeRecommendations,
);

export default profilesRouter;
