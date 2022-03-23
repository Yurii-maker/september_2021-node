import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interfaces/tokenInterface';
import { ICustomRequest } from '../interfaces/customRequest';
import { tokenService } from '../services/tokenService';
import { IUser } from '../entity/user';

class AuthController {
    public async registration(req:Request, res:Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 100, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req:ICustomRequest, res:Response):Promise<Response<string>> {
        const { id } = req.user as IUser;
        res.clearCookie('refreshToken');
        console.log(id);
        await tokenService.deleteTokens(id);
        return res.json('ok');
    }

    public async login(req:ICustomRequest, res:Response) {
        const { id, email, password: hashedPassword } = req.user as IUser;
        const { password } = req.body;
        await authService.checkPassword(password, hashedPassword);
        const { refreshToken, accessToken } = await tokenService
            .generateTokensPair({ userId: id, userEmail: email });
        await tokenService.saveToken({ userId: id, refreshToken, accessToken });
        res.json({ user: req.user, accessToken, refreshToken });
    }

    public async refresh(req:ICustomRequest, res:Response) {
        const { id, email } = req.user as IUser;
        const { refreshToken, accessToken } = await tokenService
            .generateTokensPair({ userId: id, userEmail: email });
        await tokenService.saveToken({ userId: id, refreshToken, accessToken });
        res.json({ user: req.user, accessToken, refreshToken });
    }
}
export const authController = new AuthController();
