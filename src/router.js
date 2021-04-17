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
  .post(textController.processText);

router.route('/upload')
  .post(textController.uploadFile);

export default router;
