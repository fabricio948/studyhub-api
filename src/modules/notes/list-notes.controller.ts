import type { Note } from "./note";
import type { NotesRepository } from "./notes.repository";

export class ListNotesController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(): Note[] {
    throw new Error("falha secreta de teste");
  }
}
