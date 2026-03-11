import { RequestHandler } from 'express'
import { Schema, ValidationError } from 'yup'
import { StatusCodes } from 'http-status-codes'
import { responseHelper } from '../../shared/helpers/response-helper'

type PropertyTypes = 'body' | 'header' | 'params' | 'query'
type GetSchemaTypes = <T>(schema: Schema<T>) => Schema<T>
type AllSchemaTypes = Record<PropertyTypes, Schema<any>>
type GetAllSchemasTypes = (getSchema: GetSchemaTypes) => Partial<AllSchemaTypes>

type ValidationTypes = (getAllSchemas: GetAllSchemasTypes) => RequestHandler

const validation: ValidationTypes = (getAllSchemas) =>
  async (request, response, next) => {
    const schemas = getAllSchemas(schema => schema)

    const errorsResult: string[] = []

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(request[key as PropertyTypes], { abortEarly: false })
      } catch (error) {
        const yupError = error as ValidationError

        yupError.inner.forEach(error => {
          if (error.path !== undefined) errorsResult.push(error.message)
        })
      }
    })

    if (errorsResult.length === 0) {
      return next()
    } else {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(responseHelper({
          status: false,
          errors: errorsResult
        }))
    }
  }

export { validation }
