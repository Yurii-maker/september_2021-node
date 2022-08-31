import { NextFunction, Request, Response } from 'express';

import {
    authService, tokenService, emailService, userService,
} from '../services';
import { ITokenData, ICustomRequest } from '../interfaces';
import { IUser } from '../entity';
import { EmailActionsEnum } from '../constants';
import { actionTokenRepository } from '../repositories';

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
        await emailService.sendMail(
            req.body.email,
            EmailActionsEnum.WELCOME,
            { userName: req.body.firstName },
        );
        return res.json(data);
    }

    public async logout(
        req:ICustomRequest,
        res:Response,
        next:NextFunction,
    ):Promise<Response<string>| undefined> {
        try {
            const { id } = req.user as IUser;
            res.clearCookie('refreshToken');
            await tokenService.deleteTokens(id);
            return res.json('ok');
        } catch (e) {
            next(e);
        }
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

    public async sendForgotPassword(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;
            const actionToken = await tokenService
                .generateActionToken({ userId: id, userEmail: email });
            await actionTokenRepository.createActionToken({ userId: id, actionToken });
            await emailService
                .sendMail(
                    email,
                    EmailActionsEnum.NEW_PASSWORD,
                    { userName: firstName, actionToken },
                );
            return res.json('Ok');
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get('Authorization');
            await userService.updateUserByParams(id, req.body);
            await actionTokenRepository.deleteActionTokenByParams({ actionToken });
            return res.json('Ok');
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
