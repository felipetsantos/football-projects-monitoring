require('dotenv').config({
  silent: true
})
const joi = require('joi')
const logger = require('winston')

const envVarsSchema = joi.object({
    LOGGER_LEVEL: joi.string()
      .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default('info'),
    LOGGER_ENABLED: joi.boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(true)
  }).unknown()
  .required()

const {
  error,
  value: envVars
} = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Missging environment variable: ${error.message}`)
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
}

logger.level = config.logger.level

if (!config.logger.enabled) {
  logger.remove(logger.transports.Console)
}

module.exports = config