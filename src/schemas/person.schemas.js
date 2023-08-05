import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required(),
})

export const signInSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
})