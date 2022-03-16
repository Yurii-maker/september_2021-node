export interface IUserPayload {
    userId: number,
    userEmail: string
}
export interface ITokenPair {
    accessToken: string,
    refreshToken: string
}
export type ITokenData = ITokenPair & IUserPayload;
