import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepositoryInterface';
import { IPaginationResponse } from '../../interfaces';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager()
            .getRepository(User)
            .save(user);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager()
            .getRepository(User)
            .find();
    }

    public async updateUser(id:number, { password, email }:Partial<IUser>):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id }, {
                password,
                email,
            });
    }

    public async deleteUser(id:number):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .softDelete({ id });
    }

    public async getUserByEmail(userEmail:string) : Promise<IUser | undefined> {
        return getManager().getRepository(User).findOne({
            where:
                { email: userEmail },
        });
    }

    public async updateUserByParams(id:number, params:Partial<IUser>):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update(
                { id },
                params,
            );
    }

    public async getUserPagination(
        page: number = 1,
        perPage:number = 5,
        searchObject: Partial<IUser> = {},
    ):
        Promise<IPaginationResponse<IUser>> {
        const skip = perPage * (page - 1);
        const take = perPage;
        const [users, count] = await getManager()
            .getRepository(User)
            .findAndCount(
                { where: searchObject, skip, take },
            );

        return {
            page,
            perPage,
            itemCount: count,
            data: users,
        };
    }
}
export const userRepository = new UserRepository();
