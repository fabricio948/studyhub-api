export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  details?: ValidationIssue[];
}
