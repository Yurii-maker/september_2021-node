import { DeleteResult } from 'typeorm';
import { IActionToken } from '../../entity';

export interface IActionTokenRepository {
    createActionToken (token:IActionToken):Promise<IActionToken>,
    findActionTokenByParams(params: Partial <IActionToken>):Promise<IActionToken | undefined>,
    deleteActionTokenByParams(params:Partial<IActionToken>):Promise<DeleteResult>,
}
