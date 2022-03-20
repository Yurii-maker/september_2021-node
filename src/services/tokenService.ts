import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';
import { config } from '../configs/config';
import { ITokenPair, IUserPayload } from '../interfaces/tokenInterface';

import { tokenRepository } from '../repositories/token/tokenRepository';
import { ITokens } from '../entity/token';

class TokenService {
    public async generateTokensPair(payload:IUserPayload):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.ACCESS_TOKEN_LIFE },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.REFRESH_TOKEN_LIFE },
        );

        return { accessToken, refreshToken };
    }

    public async saveToken(token:ITokens): Promise<ITokens> {
        const { userId, refreshToken, accessToken } = token;
        const tokenFromDb = await tokenRepository.findTokenByUserid(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        return tokenRepository.createToken({ userId, refreshToken, accessToken });
    }

    public async deleteToken(userId:number):Promise<DeleteResult> {
        const deletedToken = await tokenRepository.deleteTokenByUserId(userId);
        return deletedToken;
    }

    public async verifyToken(authToken: string): Promise<IUserPayload> {
        return jwt.verify(authToken, config.SECRET_ACCESS_KEY as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
