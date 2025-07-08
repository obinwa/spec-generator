export class SwaggerParseError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'SwaggerParseError';
  }
}