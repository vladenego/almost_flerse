import Joi from '@hapi/joi'

export const authSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})
