import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepositoryInterface';

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
}
export const userRepository = new UserRepository();
