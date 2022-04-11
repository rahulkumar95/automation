class InvalidCredentialsError extends Error {
  constructor(message = 'Invalid Credentials') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = InvalidCredentialsError;
