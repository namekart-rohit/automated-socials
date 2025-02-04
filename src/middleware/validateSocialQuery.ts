import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "../core/ApiError";

const querySchema = Joi.object({
  query: Joi.string().uri().required().messages({
    "string.uri": "Query must be a valid URL",
    "any.required": "Query is required",
  }),
});

const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = querySchema.validate(req.body);
  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }
  next();
};

export default validateQuery;
