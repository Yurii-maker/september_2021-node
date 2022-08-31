import { DeleteResult } from 'typeorm';

import { ITokens } from '../../entity';
import { ITokenPair } from '../../interfaces';

export interface ITokenRepository{
    createToken(token:ITokens):Promise<ITokens>,
    findTokensByParams(params: Partial <ITokenPair>):Promise<ITokens | undefined>,
    deleteTokensByUserId(userId:number):Promise<DeleteResult>
}
