import ld from 'lodash'
const { merge } = ld;
import dev from "./dev.js"
import testing from "./testing.js"
import prod from "./prod.js"

const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = dev
    break
  case 'test':
  case 'testing':
    envConfig = testing
    break
  default:
    envConfig = prod
}

export default merge(baseConfig, envConfig)
