import { Router } from 'express';
import * as userController from './controllers/userController';

const router = Router();

router.route('/user/:username')
  .post(userController.addUser)
  .get(userController.getUser)
  .put(userController.updatePreferences)
  .delete(userController.deleteUser);

export default router;
