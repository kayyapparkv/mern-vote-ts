import express from 'express';

import controller from '../controller/poll';
import middleware from '../middlewares/auth';

const router = express.Router();

router.route('/').post(middleware, controller.createPoll).get(controller.showPoll);
router.route('/user').get(middleware, controller.showUser);
router.route('/:id').get(controller.getPoll).post(middleware, controller.vote).delete(middleware, controller.deletePoll);

export default router;