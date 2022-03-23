import { DeleteResult } from 'typeorm';

import { ITokens } from '../../entity/token';
import { ITokenPair } from '../../interfaces/tokenInterface';

export interface ITokenRepository{
    createToken(token:ITokens):Promise<ITokens>,
    findTokenByUserId(id:number):Promise<ITokens | undefined>,
    findTokensByParams(params: Partial <ITokenPair>):Promise<ITokens | undefined>,
    deleteTokenByUserId(userId:number):Promise<DeleteResult>,
    deleteTokenByParams(params:Partial<ITokens>):Promise<DeleteResult>
}
