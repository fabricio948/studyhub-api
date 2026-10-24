import type { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../shared/errors";
import { RequestValidator } from "../../shared/request-validator";
import { noteIdParamsSchema } from "./note.schemas";
import type { NotesRepository } from "./notes.repository";

export class DeleteNoteController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(request: FastifyRequest, reply: FastifyReply): FastifyReply {
    const { id } = RequestValidator.parse(noteIdParamsSchema, request.params);

    const removed = this.notesRepository.remove(id);

    if (!removed) {
      throw new NotFoundError(`Nota ${id} nao encontrada`);
    }

    return reply.code(204).send();
  }
}
