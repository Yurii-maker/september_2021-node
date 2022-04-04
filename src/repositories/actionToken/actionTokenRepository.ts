import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { ActionToken, IActionToken } from '../../entity/actionToken';
import { IActionTokenRepository } from './actionTokenRepositoryInterface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async createActionToken(token:IActionToken):Promise<IActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    public async findActionTokenByParams(params: Partial <IActionToken>):
        Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(params);
    }

    public async deleteActionTokenByParams(params:Partial<IActionToken>):Promise<DeleteResult> {
        return getManager().getRepository(ActionToken).delete(params);
    }
}
export const actionTokenRepository = new ActionTokenRepository();
