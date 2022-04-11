class ValidationError extends Error {
  constructor(details, message = 'Validation Error') {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;
