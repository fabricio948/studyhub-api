import { z } from "zod";
import { ValidationError } from "./errors";

export class RequestValidator {
  static parse<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((issue) => {
          const field = issue.path.join(".");

          return {
            field: field === "" ? "(geral)" : field,
            message: issue.message,
          };
        }),
      );
    }

    return result.data;
  }
}
