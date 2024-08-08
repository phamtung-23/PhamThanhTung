import Joi from 'joi';

export const menuBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
});

export const menuQuerySchema = Joi.object({
  field: Joi.string(),
  sort: Joi.string().valid('asc', 'desc'),
});

export const menuParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Assuming MongoDB ObjectID format
});
