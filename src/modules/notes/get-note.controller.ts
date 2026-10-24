import type { FastifyReply, FastifyRequest } from "fastify";
import type { ErrorResponse } from "../../shared/error-response";
import type { Note } from "./note";
import type { NotesRepository } from "./notes.repository";

export interface GetNoteParams {
  id: string;
}

export class GetNoteController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(
    request: FastifyRequest<{ Params: GetNoteParams }>,
    reply: FastifyReply,
  ): Note | ErrorResponse {
    const id = Number(request.params.id);

    if (!Number.isInteger(id)) {
      reply.code(400);
      return {
        statusCode: 400,
        error: "Bad Request",
        message: "O id deve ser um numero inteiro",
      };
    }

    const note = this.notesRepository.findById(id);

    if (note === undefined) {
      reply.code(404);
      return {
        statusCode: 404,
        error: "Not Found",
        message: `Nota ${id} nao encontrada`,
      };
    }

    return note;
  }
}
