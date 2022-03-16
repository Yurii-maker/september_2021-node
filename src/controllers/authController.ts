import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interfaces/tokenInterface';

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
}
export const authController = new AuthController();
