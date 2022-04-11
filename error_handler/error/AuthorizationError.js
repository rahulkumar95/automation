class AuthorizationError extends Error {
  constructor(
    isPermissionDenied = false,
    isTokenExpired = false,
    message = 'Unauthorized Access',
  ) {
    super(message);
    this.is_permission_denied = isPermissionDenied;
    this.is_token_expired = isTokenExpired;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AuthorizationError;
