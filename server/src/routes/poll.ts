import express from 'express';

import controller from '../controller/poll';
import middleware from '../middlewares/auth';

const router = express.Router();

router.route('/').post(middleware, controller.createPoll).get(controller.showPoll);

export default router;