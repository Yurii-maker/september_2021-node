import { DeleteResult } from 'typeorm';

import { ITokens } from '../../entity/token';

export interface ITokenRepository{
    createToken(token:ITokens):Promise<ITokens>,
    findTokenByUserid(id:number):Promise<ITokens | undefined>,
    deleteTokenByUserId(userId:number):Promise<DeleteResult>
}
