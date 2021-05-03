const joi = require('joi')

const schema = joi.object({
  text: joi.string()
    .required(),
  completed: joi.boolean()
    .required()
})

module.exports = schema
