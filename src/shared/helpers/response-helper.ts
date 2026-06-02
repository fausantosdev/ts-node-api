export type ResponseHelper = {
  status?: boolean
  data?: any
  message?: string | Array<string>
}

export function responseHelper({
  status = true,
  data = null,
  message = '',
}: ResponseHelper): ResponseHelper {
  return {
    status,
    data,
    message,
  }
}
