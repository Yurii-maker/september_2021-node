import { NextFunction, Response } from 'express';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';
import { ICustomRequest } from '../interfaces/customRequest';

class AuthMiddleware {
    public async checkAccessToken(req:ICustomRequest, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new Error('no token');
            }
            const { userEmail } = await tokenService.verifyToken(authToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('wrong token');
            }
            req.user = userFromToken;
            next();
        } catch (e:any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}
export const authMiddleware = new AuthMiddleware();
