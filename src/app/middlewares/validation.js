import { celebrate, Joi, Segments, errors } from 'celebrate';

const userCreateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    birthday: Joi.date()
      .required()
      .max(new Date()),
    password: Joi.string()
      .required()
      .min(6),
  }),
});

const userUpdateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    oldPassword: Joi.string()
      .required()
      .min(6),
    birthday: Joi.date().max(new Date()),
    password: Joi.string()
      .required()
      .min(6),
    confirmPassword: Joi.string()
      .required()
      .min(6),
    avatar_id: Joi.string(),
  }),
});

const userShowValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
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

const fileCreateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

const listIndexValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

const listCreateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .max(40),
    description: Joi.string(),
  }),
});

const listShowValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const listUpdateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(30),
    description: Joi.string(),
  }),
});

const listDeleteValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const taskCreateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    listId: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .max(40),
    status: Joi.string().valid('active', 'complete', 'pastdue'),
    color: Joi.string(),
    notes: Joi.string(),
    due: Joi.date().min(new Date()),
  }),
});

const taskUpdateValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    listId: Joi.string().required(),
    taskId: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(40),
    status: Joi.string().valid('active', 'complete', 'pastdue'),
    color: Joi.string(),
    notes: Joi.string(),
    due: Joi.date().min(new Date()),
  }),
});

const taskDeleteValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    listId: Joi.string().required(),
    taskId: Joi.string().required(),
  }),
});

const taskIndexValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    listId: Joi.string().required(),
  }),
});

export default {
  userCreateValidator,
  userUpdateValidator,
  userShowValidator,
  sessionCreateValidator,
  fileCreateValidator,
  listIndexValidator,
  listCreateValidator,
  listShowValidator,
  listUpdateValidator,
  listDeleteValidator,
  taskCreateValidator,
  taskUpdateValidator,
  taskDeleteValidator,
  taskIndexValidator,
  errors,
};
