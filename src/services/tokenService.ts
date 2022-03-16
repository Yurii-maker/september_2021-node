import jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { ITokenPair, IUserPayload } from '../interfaces/tokenInterface';

import { tokenRepository } from '../repositories/token/tokenRepository';
import { IRefreshToken } from '../entity/token';

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

    public async saveToken(token:IRefreshToken): Promise<IRefreshToken> {
        const { userId, refreshToken } = token;
        const tokenFromDb = await tokenRepository.findTokenByUserid(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        return tokenRepository.createToken({ userId, refreshToken });
    }
}

export const tokenService = new TokenService();
