import type { FastifyReply, FastifyRequest } from "fastify";
import { RequestValidator } from "../../shared/request-validator";
import type { Note } from "./note";
import { createNoteSchema } from "./note.schemas";
import type { NotesRepository } from "./notes.repository";

export class CreateNoteController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(request: FastifyRequest, reply: FastifyReply): Note {
    const data = RequestValidator.parse(createNoteSchema, request.body);
    const note = this.notesRepository.create(data);

    reply.code(201).header("Location", `/notes/${note.id}`);

    return note;
  }
}
