import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  thumnails: Joi.string(),
  category: Joi.string(),
  quantity: Joi.number(),
  status: Joi.string(),
});
