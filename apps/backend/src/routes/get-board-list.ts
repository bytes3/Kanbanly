import { Hono, type Context } from "hono";
import { IBoardService } from "../services/board-service";
import { IBoardRepository } from "../repositories/board-repository";

const app = new Hono();

app.get("/", async (context: Context) => {
  const projectId = context.req.param("projectId");
  const boardId = context.req.param("boardId");

  const sessionInfo = context.get("jwtPayload");
  const boardRepository = new IBoardRepository(sessionInfo);
  const boardService = new IBoardService(boardRepository);

  const result = await boardService.getBoardsList(projectId, boardId);

  context.status(200);
  return context.json(result);
});

export default app;
