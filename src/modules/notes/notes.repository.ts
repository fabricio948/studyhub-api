import type { Note } from "./note";

export class NotesRepository {
  private readonly notes: Note[] = [
    {
      id: 1,
      title: "Estudar HTTP",
      content: "Metodos, status codes e headers",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Estudar REST",
      content: "Recursos, URLs e verbos",
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Note[] {
    return [...this.notes];
  }

  findById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }
}
