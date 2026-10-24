import { z } from "zod";

export const noteIdParamsSchema = z.object({
  id: z.coerce
    .number({ error: "O id deve ser um numero" })
    .int({ error: "O id deve ser inteiro" })
    .positive({ error: "O id deve ser positivo" }),
});
