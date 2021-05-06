import joi from 'joi'

const schema = joi.object({
  text: joi.string()
    .required(),
  completed: joi.boolean()
    .required()
})

export default schema
