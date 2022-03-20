import { Request } from 'express';

import { IUser } from '../entity/user';

export interface ICustomRequest extends Request{
user?:IUser
}
