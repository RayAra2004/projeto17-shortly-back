import joi from 'joi';

export const personSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required(),
})