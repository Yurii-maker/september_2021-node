import { DeleteResult } from 'typeorm';

import { ITokens } from '../../entity/token';
import { ITokenPair } from '../../interfaces/tokenInterface';

export interface ITokenRepository{
    createToken(token:ITokens):Promise<ITokens>,
    findTokensByParams(params: Partial <ITokenPair>):Promise<ITokens | undefined>,
    deleteTokensByUserId(userId:number):Promise<DeleteResult>
}
