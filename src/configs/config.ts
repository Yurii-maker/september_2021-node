import dotenv from 'dotenv';

dotenv.config();

export const config = {
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    PORT: process.env.PORT || 5500,
    SALT: process.env.SALT,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
};
