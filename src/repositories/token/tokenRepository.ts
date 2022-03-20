import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { ITokens, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepositoryInterface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token:ITokens):Promise<ITokens> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserid(id:number):Promise<ITokens | undefined> {
        return getManager().getRepository(Token).findOne({
            where: { userId: id },
        });
    }

    public async deleteTokenByUserId(userId:number):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}
export const tokenRepository = new TokenRepository();
