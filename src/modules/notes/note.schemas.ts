import { z } from "zod";

const titleSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "O titulo e obrigatorio"
        : "O titulo deve ser um texto",
  })
  .trim()
  .min(1, { error: "O titulo e obrigatorio" })
  .max(100, { error: "O titulo deve ter no maximo 100 caracteres" });

const contentSchema = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "O conteudo e obrigatorio"
        : "O conteudo deve ser um texto",
  })
  .trim()
  .max(1000, { error: "O conteudo deve ter no maximo 1000 caracteres" });

export const noteIdParamsSchema = z.object({
  id: z.coerce
    .number({ error: "O id deve ser um numero" })
    .int({ error: "O id deve ser inteiro" })
    .positive({ error: "O id deve ser positivo" }),
});

export const createNoteSchema = z.object({
  title: titleSchema,
  content: contentSchema.default(""),
});

export const replaceNoteSchema = z.object({
  title: titleSchema,
  content: contentSchema,
});

export const updateNoteSchema = z
  .object({
    title: titleSchema.optional(),
    content: contentSchema.optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    error: "Informe ao menos um campo para alterar",
  });
