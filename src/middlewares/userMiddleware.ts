import { Response, NextFunction } from 'express';

import { ICustomRequest } from '../interfaces/customRequest';
import { userService } from '../services/userService';
import { ErrorHandler } from '../errors/errorHandler';

class UserMiddleware {
    public async checkUserExist(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const userFromDB = await userService.getUserByEmail(email);
            if (!userFromDB) {
                next(new ErrorHandler('user not found', 404));
                return;
            }
            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
