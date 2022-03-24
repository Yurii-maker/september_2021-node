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

    public async findTokensByParams(params: Partial <ITokenPair>):Promise<ITokens | undefined> {
        return getManager().getRepository(Token).findOne(params);
    }

    public async deleteTokensByUserId(userId:number):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}
export const tokenRepository = new TokenRepository();
