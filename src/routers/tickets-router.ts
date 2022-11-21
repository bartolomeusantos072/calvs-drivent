import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import  { ticketTypeIdSchema } from "@/schemas/tickets-schemas";
import { postTickets, getTickets, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();
ticketsRouter.use(authenticateToken);
ticketsRouter.get("/tickets", getTickets);
ticketsRouter.post("/tickets", validateBody(ticketTypeIdSchema), postTickets);
ticketsRouter.get("/tickets/types",  getTicketsTypes);

export { ticketsRouter };
