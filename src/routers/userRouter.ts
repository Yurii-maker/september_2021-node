import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUserPagination);
router.patch('/:id', userMiddleware.idValidate, userController.updateUser);
router.delete('/:id', userMiddleware.idValidate, userMiddleware.userToUpdateValidate, userController.deleteUser);
router.get('/:email', userMiddleware.emailValidate, userController.getUserByEmail);

export const userRouter = router;
