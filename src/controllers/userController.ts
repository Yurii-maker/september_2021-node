import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, perPage, ...other } = req.query;
            const userPagination = await userService
                .getUserPagination(Number(page), Number(perPage), other);
            res.json(userPagination);
        } catch (e) {
            next(e);
        }
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
