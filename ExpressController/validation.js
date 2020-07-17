//This module will be used to validate data
const Joi = require('@hapi/joi')

//validate a new user 
const userValidation = data => {
  //create a new Joi object as a schema (should match Mongo schema)
  const schema = Joi.object({
    firstName: 
      Joi.string()
      .required(),
    lastName: 
      Joi.string()
      .required(),
    username:
      Joi.string()
      .email()
      .required(),
    password:
      Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data)
}

//validate login
const loginValidation = data => {
  //create a new Joi object as a schema (should match Mongo schema)
  const schema = Joi.object({
    username:
      Joi.string()
      .email()
      .required(),
    password:
      Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data)
}

module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation