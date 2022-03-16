import { IRefreshToken } from '../../entity/token';

export interface ITokenRepository{
    createToken(token:IRefreshToken):Promise<IRefreshToken>,
    findTokenByUserid(id:number):Promise<IRefreshToken | undefined>
}
