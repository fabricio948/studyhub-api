import type { ValidationIssue } from "./error-response";

export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    readonly error: string,
    message: string,
    readonly details?: ValidationIssue[],
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, "Not Found", message);
  }
}

export class ValidationError extends AppError {
  constructor(details: ValidationIssue[]) {
    super(400, "Bad Request", "Dados invalidos", details);
  }
}
