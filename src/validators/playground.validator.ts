import * as yup from 'yup';

export const playgroundValidator = yup.object({
  body: yup.object({
    name: yup.string().required(),
  }),
  query: yup.object({
    name: yup.string().required(),
  }),
})