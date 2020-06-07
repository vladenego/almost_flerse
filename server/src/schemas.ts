import Joi from '@hapi/joi'

export const authSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  username: Joi.string().alphanum().min(6).max(16).required(),
  password: Joi.string().min(6).required(),
})
