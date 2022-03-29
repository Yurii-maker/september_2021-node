import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middlewares/userMiddleware';

const router = Router();

router.get('/', userController.getAllUsers);
router.patch('/:id', userMiddleware.idValidate, userController.updateUser);
router.delete('/:id', userMiddleware.idValidate, userMiddleware.userToUpdateValidate, userController.deleteUser);
router.get('/:email', userMiddleware.emailValidate, userController.getUserByEmail);

export const userRouter = router;
