const joi = require('joi')

const envVarsSchema = joi.object({
  GITHUB_TOKEN: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Missging environment variable: ${error.message}`)
}

const githubConfig = {
  token: envVars.GITHUB_TOKEN
}

module.exports = githubConfig
