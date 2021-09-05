import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('PRODUCTION', 'DEVELOPMENT').default('PRODUCTION'),
    PORT: joi.number().default(5000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
