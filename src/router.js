import { Router } from 'express';
import * as userController from './controllers/userController';
import * as textController from './controllers/textController';

const router = Router();

router.route('/user/:username')
  .post(userController.addUser)
  .get(userController.getUser)
  .put(userController.updatePreferences)
  .delete(userController.deleteUser);

router.route('/text/:username')
  .get(textController.processText)
  .post(textController.uploadFile);

export default router;
