import { IUser } from '../entity/user';
import { userService } from './userService';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces/tokenInterface';

class AuthService {
    public async registration(user: IUser):Promise<ITokenData> {
        const { email } = user;
        const userExists = await userService.getUserByEmail(email);
        if (userExists) {
            throw new Error(`user with email: ${email} already exists`);
        }
        const createdUser = await userService.createUser(user);

        return this._getTokensPair(createdUser);
    }

    private async _getTokensPair(userData:IUser): Promise<ITokenData> {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokensPair({ userId: id, userEmail: email });
        await tokenService.saveToken({
            userId: id,
            refreshToken: tokensPair.refreshToken,
            accessToken: tokensPair.accessToken,
        });
        return { ...tokensPair, userId: id, userEmail: email };
    }
}
export const authService = new AuthService();
