import { NextFunction, Response } from 'express';

import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';
import { ICustomRequest } from '../interfaces/customRequest';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { userValidators } from '../validators/userValidator';
import { ErrorHandler } from '../errors/errorHandler';

class AuthMiddleware {
    public async checkAccessToken(req:ICustomRequest, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(authToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            const tokenPair = await tokenRepository.findTokensByParams({ accessToken: authToken });
            if (!tokenPair) {
                next(new ErrorHandler('invalid token', 404));
                return;
            }
            if (!userFromToken) {
                next(new ErrorHandler('wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req:ICustomRequest, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(authToken, 'refresh');
            const userFromToken = await userService.getUserByEmail(userEmail);

            const tokenPair = await tokenRepository.findTokensByParams({ refreshToken: authToken });
            if (!tokenPair) {
                next(new ErrorHandler('invalid token', 404));
                return;
            }
            if (!userFromToken) {
                next(new ErrorHandler('wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async registrationDataValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userRegistration.validate(req.body);

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

    public async loginDataValidate(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidators.userLogin.validate(req.body);

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
export const authMiddleware = new AuthMiddleware();
