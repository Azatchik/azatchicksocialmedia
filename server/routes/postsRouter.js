import Router from 'express';
const postsRouter = new Router();

postsRouter.post('/posts');
postsRouter.post('/posts');
postsRouter.get('/posts');

module.exports = postsRouter;
