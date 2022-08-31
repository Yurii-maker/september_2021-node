import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { ICustomRequest } from '../interfaces';
import { tokenRepository, actionTokenRepository } from '../repositories';
import { userValidators } from '../validators';
import { ErrorHandler } from '../errors';

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

    public async registrationDataValidate(req: ICustomRequest, res: Response, next: NextFunction)
        :Promise<void> {
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

    public async loginDataValidate(req: ICustomRequest, res: Response, next: NextFunction)
        :Promise<void> {
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

    public async checkActionToken(req:ICustomRequest, res:Response, next:NextFunction) {
        try {
            const actionToken = req.get('Authorization');
            if (!actionToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');
            const userFromToken = await userService.getUserByEmail(userEmail);

            const actionTokenFromDB = await actionTokenRepository
                .findActionTokenByParams({ actionToken });
            if (!actionTokenFromDB) {
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
}
export const authMiddleware = new AuthMiddleware();
