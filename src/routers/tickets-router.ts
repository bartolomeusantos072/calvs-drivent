import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import  { ticketTypeIdSchema } from "@/schemas/tickets-schemas";
import { postTickets, getTickets, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();
ticketsRouter.get("/tickets/types", authenticateToken, getTicketsTypes);
ticketsRouter.get("/tickets", authenticateToken, getTickets);
ticketsRouter.post("/tickets", validateBody(ticketTypeIdSchema), authenticateToken, postTickets);

export { ticketsRouter };
