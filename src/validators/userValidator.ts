import * as Joi from 'joi';

export const userValidators = {
    userRegistration: Joi.object({
        firstName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(100),
        phone: Joi
            .string()
            .regex(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
            .required(),
        email: Joi
            .string()
            .regex(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
            .trim()
            .lowercase()
            .required(),
        password: Joi
            .string()
            .regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/)
            .required(),
    }),

    userLogin: Joi.object({
        email: Joi
            .string()
            .regex(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
            .trim()
            .lowercase()
            .required(),
        password: Joi
            .string()
            .regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/)
            .required(),
    }),
};
