import Router from 'express';
import musicController from "../controllers/musicController.js";
const musicRouter = new Router();

musicRouter.post('/get-music',
    musicController.getMusic,
);

musicRouter.post('/add-music',
    musicController.addMusic,
);

musicRouter.post('/get-music-recommendations',
    musicController.getRecommendations,
);

musicRouter.post('/search-music',
    musicController.searchMusic,
);

export default musicRouter;
