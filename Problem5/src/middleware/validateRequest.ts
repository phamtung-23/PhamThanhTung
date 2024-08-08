import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validate = (schema: Joi.ObjectSchema | undefined, data: any, next: NextFunction) => {
  if (schema) {
    const { error } = schema.validate(data);
    if (error) {
      return next({
        code: -12,
        message: error.message,
      });
    }
  }
};

const validateRequest = (schemas: {
  body?: Joi.ObjectSchema,
  query?: Joi.ObjectSchema,
  params?: Joi.ObjectSchema
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(schemas.body, req.body, next);
    validate(schemas.query, req.query, next);
    validate(schemas.params, req.params, next);
    next();
  };
};

export default validateRequest;