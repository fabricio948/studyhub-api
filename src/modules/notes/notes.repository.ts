import type { Note } from "./note";

export interface NoteData {
  title: string;
  content: string;
}

export class NotesRepository {
  private nextId = 3;

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
    return this.notes.map((note) => ({ ...note }));
  }

  findById(id: number): Note | undefined {
    const note = this.notes.find((item) => item.id === id);

    return note === undefined ? undefined : { ...note };
  }

  create(data: NoteData): Note {
    const note: Note = {
      id: this.nextId,
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
    };

    this.nextId += 1;
    this.notes.push(note);

    return { ...note };
  }

  update(id: number, data: Partial<NoteData>): Note | undefined {
    const note = this.notes.find((item) => item.id === id);

    if (note === undefined) {
      return undefined;
    }

    if (data.title !== undefined) {
      note.title = data.title;
    }

    if (data.content !== undefined) {
      note.content = data.content;
    }

    return { ...note };
  }

  remove(id: number): boolean {
    const index = this.notes.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.notes.splice(index, 1);

    return true;
  }
}
