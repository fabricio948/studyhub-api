import type { Note } from "./note";
import type { NotesRepository } from "./notes.repository";

export class ListNotesController {
  constructor(private readonly notesRepository: NotesRepository) {}

  handle(): Note[] {
    return this.notesRepository.findAll();
  }
}
