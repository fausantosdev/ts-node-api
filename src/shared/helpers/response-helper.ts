type ResponseHelper = {
  status?: boolean
  data?: any
  errors: string | Array<string> | object
}

function responseHelper({
  status = true,
  data = null,
  errors = '',
}: ResponseHelper): ResponseHelper {
  return {
    status,
    data,
    errors,
  }
}

export { responseHelper, ResponseHelper }
