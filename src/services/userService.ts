import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { IPaginationResponse } from '../interfaces';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const userWithHashedPassword = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(userWithHashedPassword);
        return createdUser;
    }

    public async getAllUsers():Promise<IUser[]> {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }

    public async getUserPagination(page: number, perPage:number, searchObject: any):
        Promise<IPaginationResponse<IUser>> {
        return userRepository.getUserPagination(page, perPage, searchObject);
    }

    public async updateUser(id:number, user:Partial<IUser>):Promise<UpdateResult> {
        const updatedUser = await userRepository.updateUser(id, user);
        return updatedUser;
    }

    public async updateUserByParams(id:number, user:Partial<IUser>):
        Promise<UpdateResult | undefined> {
        if (user.password) {
            user.password = await this._hashPassword(user.password);
        }

        return userRepository.updateUserByParams(id, user);
    }

    public async deleteUser(id:number):Promise<UpdateResult> {
        const deletedUser = await userRepository.deleteUser(id);
        return deletedUser;
    }

    public async getUserByEmail(email:string) {
        const userByEmail = await userRepository.getUserByEmail(email);
        return userByEmail;
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
export const userService = new UserService();
