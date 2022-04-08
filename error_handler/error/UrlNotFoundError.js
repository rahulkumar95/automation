class UrlNotFoundError extends Error {
  constructor(message = 'Url Not Found') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UrlNotFoundError;
