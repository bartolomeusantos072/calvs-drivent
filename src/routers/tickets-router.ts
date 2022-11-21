import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import  { ticketTypeIdSchema } from "@/schemas/tickets-schemas";
import { postTickets, getTickets, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();
ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types",  getTicketsTypes);
ticketsRouter.get("/", getTickets);
ticketsRouter.post("/", validateBody(ticketTypeIdSchema), postTickets);

export { ticketsRouter };
