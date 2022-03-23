import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { ITokens, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepositoryInterface';
import { ITokenPair } from '../../interfaces/tokenInterface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(tokens:ITokens):Promise<ITokens> {
        return getManager().getRepository(Token).save(tokens);
    }

    public async findTokenByUserId(id:number):Promise<ITokens | undefined> {
        return getManager().getRepository(Token).findOne({
            where: { userId: id },
        });
    }

    public async findTokensByParams(params: Partial <ITokenPair>):Promise<ITokens | undefined> {
        return getManager().getRepository(Token).findOne(params);
    }

    public async deleteTokenByUserId(userId:number):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }

    public async deleteTokenByParams(params:Partial<ITokens>):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete(params);
    }
}
export const tokenRepository = new TokenRepository();
