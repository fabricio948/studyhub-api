import type { FastifyRequest } from "fastify";
import { NotFoundError } from "../../shared/errors";
import { RequestValidator } from "../../shared/request-validator";
import type { Note } from "./note";
import { noteIdParamsSchema, updateNoteSchema } from "./note.schemas";
import type { NotesRepository } from "./notes.repository";

export class UpdateNoteController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(request: FastifyRequest): Note {
    const { id } = RequestValidator.parse(noteIdParamsSchema, request.params);
    const data = RequestValidator.parse(updateNoteSchema, request.body);

    const note = this.notesRepository.update(id, data);

    if (note === undefined) {
      throw new NotFoundError(`Nota ${id} nao encontrada`);
    }

    return note;
  }
}
