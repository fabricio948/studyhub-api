import Fastify, { type FastifyInstance } from "fastify";
import { STATUS_CODES } from "node:http";
import { HealthController } from "./modules/health/health.controller";
import { CreateNoteController } from "./modules/notes/create-note.controller";
import { DeleteNoteController } from "./modules/notes/delete-note.controller";
import { GetNoteController } from "./modules/notes/get-note.controller";
import { ListNotesController } from "./modules/notes/list-notes.controller";
import { NotesRepository } from "./modules/notes/notes.repository";
import { ReplaceNoteController } from "./modules/notes/replace-note.controller";
import { UpdateNoteController } from "./modules/notes/update-note.controller";
import type { ErrorResponse } from "./shared/error-response";
import { AppError } from "./shared/errors";

export interface AppOptions {
  logger: boolean;
}

export class App {
  private readonly server: FastifyInstance;

  constructor(options: AppOptions) {
    this.server = Fastify({ logger: options.logger });
    this.registerErrorHandler();
    this.registerRoutes();
  }

  private registerErrorHandler(): void {
    this.server.setErrorHandler((error, request, reply) => {
      if (error instanceof AppError) {
        const body: ErrorResponse = {
          statusCode: error.statusCode,
          error: error.error,
          message: error.message,
          details: error.details,
        };

        return reply.code(error.statusCode).send(body);
      }

      const statusCode = App.statusCodeOf(error);

      if (statusCode >= 500) {
        request.log.error(error);

        const body: ErrorResponse = {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Erro interno do servidor",
        };

        return reply.code(500).send(body);
      }

      const body: ErrorResponse = {
        statusCode,
        error: STATUS_CODES[statusCode] ?? "Error",
        message: error instanceof Error ? error.message : "Requisicao invalida",
      };

      return reply.code(statusCode).send(body);
    });
  }

  private static statusCodeOf(error: unknown): number {
    if (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
    ) {
      return error.statusCode;
    }

    return 500;
  }

  private registerRoutes(): void {
    const notesRepository = new NotesRepository();

    const healthController = new HealthController();
    const listNotesController = new ListNotesController(notesRepository);
    const getNoteController = new GetNoteController(notesRepository);
    const createNoteController = new CreateNoteController(notesRepository);
    const replaceNoteController = new ReplaceNoteController(notesRepository);
    const updateNoteController = new UpdateNoteController(notesRepository);
    const deleteNoteController = new DeleteNoteController(notesRepository);

    this.server.get("/health", async () => healthController.handle());

    this.server.get("/notes", async () => listNotesController.handle());

    this.server.get("/notes/:id", async (request) =>
      getNoteController.handle(request),
    );

    this.server.post("/notes", async (request, reply) =>
      createNoteController.handle(request, reply),
    );

    this.server.put("/notes/:id", async (request) =>
      replaceNoteController.handle(request),
    );

    this.server.patch("/notes/:id", async (request) =>
      updateNoteController.handle(request),
    );

    this.server.delete("/notes/:id", async (request, reply) =>
      deleteNoteController.handle(request, reply),
    );
  }

  async listen(host: string, port: number): Promise<void> {
    await this.server.listen({ host, port });
  }

  async close(): Promise<void> {
    await this.server.close();
  }
}
