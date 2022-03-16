import { Router } from 'express';

import { authController } from '../controllers/authController';

const router = Router();

router.post('/registration', authController.registration);

export const authRouter = router;
