import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async getAllUsers(req: Request, res: Response):Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async updateUser(req: Request, res: Response) {
        const updatedUser = await userService.updateUser(Number(req.params.id), req.body);

        res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response) {
        const deletedUser = await userService.deleteUser(Number(req.params.id));

        res.json(deletedUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const userByEmail = await userService.getUserByEmail(req.params.email);

        return res.json(userByEmail);
    }
}

export const userController = new UserController();
