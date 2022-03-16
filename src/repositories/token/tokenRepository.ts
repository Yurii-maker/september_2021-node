import { EntityRepository, getManager, Repository } from 'typeorm';

import { IRefreshToken, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepositoryInterface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token:IRefreshToken):Promise<IRefreshToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserid(id:number):Promise<IRefreshToken | undefined> {
        return getManager().getRepository(Token).findOne({
            where: { userId: id },
        });
    }
}
export const tokenRepository = new TokenRepository();
