import { resolve } from 'node:path'
import * as dotenv from 'dotenv'
import * as yup from 'yup'

dotenv.config({ path: resolve(__dirname, '..', '.env') })

const envSchema = yup.object({
  APP_KEY: yup.string().required(),
  PORT: yup.number().default(4004),
  DB_CLIENT: yup.string().required(),
  DATABASE_URL: yup.string().required(),
  NODE_ENV: yup
    .mixed<'development' | 'test' | 'production'>()
    .oneOf(['development', 'test', 'production'])
    .default('development'),
})

let env: yup.InferType<typeof envSchema>

try {
  env = envSchema.validateSync(process.env, { abortEarly: false })
} catch (err) {
  if (err instanceof yup.ValidationError) {
    console.error('x Invalid environment variables:')
    err.errors.forEach(e => console.error('  -', e))
  }
  process.exit(1)
}

export { env }
