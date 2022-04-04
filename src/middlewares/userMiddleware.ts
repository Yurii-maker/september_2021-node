import { Response, NextFunction } from 'express';

import { ICustomRequest } from '../interfaces/customRequest';
import { userService } from '../services/userService';
import { ErrorHandler } from '../errors/errorHandler';
import { userValidators } from '../validators/userValidator';

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

    public async idValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userId.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.params = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async emailValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userEmail.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.params = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async emailBodyValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userEmail.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async userToUpdateValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userToUpdate.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async passwordValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userPassword.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
