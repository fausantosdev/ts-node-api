import { RequestHandler } from 'express'
import { Schema, ValidationError } from 'yup'
import { StatusCodes } from 'http-status-codes'
import { responseHelper } from '../../shared/helpers/response-helper'

type PropertyTypes = 'body' | 'header' | 'params' | 'query'
type GetSchemaTypes = <T>(schema: Schema<T>) => Schema<T>
type AllSchemaTypes = Record<PropertyTypes, Schema<any>>
type GetAllSchemasTypes = (getSchema: GetSchemaTypes) => Partial<AllSchemaTypes>
                              // ↓↓ Partial pega um tipo T qualquer e transforma todas as propriedades obrigatórias em opcionais.
type ValidationTypes = (getAllSchemas: GetAllSchemasTypes) => RequestHandler

// Função que retorna um middleware de validação genérico
const validation: ValidationTypes = (getAllSchemas) =>
  async (request, response, next) => {
    const schemas = getAllSchemas(schema => schema)

    const errorsResult: Record<string, Record<string, string>> = {}

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(request[key as PropertyTypes], { abortEarly: false })
        //        ↑↑↑ Ao contrário do validate, o validateSync espera a validação ser concluída antes de continuar a execução do código
      } catch (error) {
        const yupError = error as ValidationError
        const errors: Record<string, string> = {}

        yupError.inner.forEach(error => {
          if (error.path !== undefined) errors[error.path] = error.message
        })

        errorsResult[key] = errors
      }
    })

    if (Object.entries(errorsResult).length === 0) {
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
