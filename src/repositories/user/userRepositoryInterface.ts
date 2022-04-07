import { UpdateResult } from 'typeorm';

import { IUser } from '../../entity/user';
import { IPaginationResponse } from '../../interfaces/paginationResponse';

export interface IUserRepository{
    createUser(user:IUser):Promise<IUser>,
    getAllUsers(): Promise<IUser[]>,
    updateUser(id:number, { password, email }:Partial<IUser>):Promise<UpdateResult>,
    deleteUser(id:number):Promise<UpdateResult>,
    getUserByEmail(userEmail:string) : Promise<IUser | undefined>,
    updateUserByParams(id:number, user:Partial<IUser>):Promise<UpdateResult>,
    getUserPagination(page: number, perPage:number, searchObject: Partial<IUser>):
        Promise<IPaginationResponse<IUser>>,
}
