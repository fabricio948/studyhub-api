import Fastify, { type FastifyInstance } from "fastify";
import { HealthController } from "./modules/health/health.controller";
import {
  GetNoteController,
  type GetNoteParams,
} from "./modules/notes/get-note.controller";
import { ListNotesController } from "./modules/notes/list-notes.controller";
import { NotesRepository } from "./modules/notes/notes.repository";

export interface AppOptions {
  logger: boolean;
}

export class App {
  private readonly server: FastifyInstance;

  constructor(options: AppOptions) {
    this.server = Fastify({ logger: options.logger });
    this.registerRoutes();
  }

  private registerRoutes(): void {
    const notesRepository = new NotesRepository();

    const healthController = new HealthController();
    const listNotesController = new ListNotesController(notesRepository);
    const getNoteController = new GetNoteController(notesRepository);

    this.server.get("/health", async () => healthController.handle());

    this.server.get("/notes", async () => listNotesController.handle());

    this.server.get<{ Params: GetNoteParams }>(
      "/notes/:id",
      async (request, reply) => getNoteController.handle(request, reply),
    );
  }

  async listen(host: string, port: number): Promise<void> {
    await this.server.listen({ host, port });
  }

  async close(): Promise<void> {
    await this.server.close();
  }
}
