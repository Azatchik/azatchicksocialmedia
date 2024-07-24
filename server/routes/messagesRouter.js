import Router from 'express';
const messagesRouter = new Router();

messagesRouter.post('/messages');
messagesRouter.post('/messages');
messagesRouter.get('/messages');

module.exports = messagesRouter;
