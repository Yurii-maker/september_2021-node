import { Response, NextFunction } from 'express';

import { ICustomRequest } from '../interfaces/customRequest';
import { userService } from '../services/userService';

class UserMiddleware {
    async checkUserExist(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const userFromDB = await userService.getUserByEmail(email);
            if (!userFromDB) {
                res.status(404)
                    .json('user not found');
                return;
            }
            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400)
                .json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
