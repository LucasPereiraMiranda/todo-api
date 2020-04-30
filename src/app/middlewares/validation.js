import { celebrate, Joi, Segments, errors } from 'celebrate';

const userCreateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    birthday: Joi.date().required(),
    password: Joi.string()
      .required()
      .min(6),
  }),
});

const sessionCreateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6),
  }),
});

export default { userCreateValidator, sessionCreateValidator, errors };
