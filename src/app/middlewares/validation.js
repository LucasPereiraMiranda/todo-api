import { celebrate, Joi } from 'celebrate';

export default {
  userCreateValidator: celebrate({
    body: Joi.object.keys({
      name: String()
        .name()
        .required(),
      email: String()
        .email()
        .required(),
      password: String()
        .password()
        .limit(6)
        .required(),
      birthday: String()
        .password()
        .required(),
    }),
  }),
};
