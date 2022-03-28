import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ message: err.message, dara: err.data });
});

export const apiRouter = router;
