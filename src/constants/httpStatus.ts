
/**
 * Enum for HTTP status codes that are used in the API.
 */
export enum httpStatus {
  // 2xx Success
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
}
