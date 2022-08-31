import { Request } from 'express';

import { IUser } from '../entity';

export interface ICustomRequest extends Request{
user?:IUser
}
