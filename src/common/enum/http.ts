/** HTTP request header common variables */
export enum HTTP_HEADER {
  /**
   * Client ip address
   */
  IP = 'x-request-ip',
  /**
   * Client JWT forensics resolves the User ID in the content.
   * The gateway will add the UID to the request header after authentication (provided there is a uid in the JWT content).
   */
  UID = 'x-request-uid',
  /**
   * Used to locate problems during log queries, usually sent down by the gateway.
   */
  RID = 'x-request-id',
  /**
   * Client-side JWT authentication credentials
   */
  AUTH = 'Authorization',
  /**
   * Request Version
   */
  VERSION = 'x-request-version',
  /**
   * Request Platform
   */
  PLATFORM = 'x-request-platform',
  /**
   * Languages supported by the client
  */
  LANGUAGE = 'x-request-accept-language',
  /**
   * The server-side API version, generally developed by the server.
   * the client gets different interface content according to different versions
   */
  API_VERSION = 'x-request-api-version',
}
/**
 * HTTP Status Code Mapping
 */
export enum HTTP_STATUS {
  /**
   * In the following location, declare the base status code.
   */
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  UNPROCURABLE = 422,
  BAD_SERVER = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  UNAVAILABLE = 503,
  /**
   * Here you can define a custom status code using the rule: `{statusCode}0000{self-incrementing}`
   *
   * @usageNotes {HTTP_STATUS.UNPROCURABLE}0000{1} -> 42200001
   */
  LOGIN_UNPROCURABLE = 42200001,
}
