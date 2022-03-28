import { NextFunction, Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interfaces/tokenInterface';
import { ICustomRequest } from '../interfaces/customRequest';
import { tokenService } from '../services/tokenService';
import { IUser } from '../entity/user';
import { emailService } from '../services/emailService';
import { EmailActionsEnum } from '../constants/enum';

class AuthController {
    public async registration(
        req:Request,
        res:Response,
        next:NextFunction,
    ):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 100, httpOnly: true },
        );
        await emailService.sendMail(req.body.email, EmailActionsEnum.WELCOME);
        return res.json(data);
    }

    public async logout(
        req:ICustomRequest,
        res:Response,
        next:NextFunction,
    ):Promise<Response<string>> {
        const { id } = req.user as IUser;
        res.clearCookie('refreshToken');
        await tokenService.deleteTokens(id);
        return res.json('ok');
    }

    public async login(req:ICustomRequest, res:Response, next:NextFunction) {
        const { id, email, password: hashedPassword } = req.user as IUser;
        const { password } = req.body;
        await authService.checkPassword(password, hashedPassword);
        const { refreshToken, accessToken } = await tokenService
            .generateTokensPair({ userId: id, userEmail: email });
        await tokenService.saveToken({ userId: id, refreshToken, accessToken });
        res.json({ user: req.user, accessToken, refreshToken });
        await emailService.sendMail(req.body.email, EmailActionsEnum.YOU_ARE_LOGINED);
    }

    public async refresh(req:ICustomRequest, res:Response, next:NextFunction) {
        const { id, email } = req.user as IUser;
        const { refreshToken, accessToken } = await tokenService
            .generateTokensPair({ userId: id, userEmail: email });
        await tokenService.saveToken({ userId: id, refreshToken, accessToken });
        res.json({ user: req.user, accessToken, refreshToken });
    }
}
export const authController = new AuthController();
