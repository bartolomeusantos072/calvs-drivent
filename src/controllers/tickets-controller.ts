import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = Number(req.body.ticketTypeId);
  if(!ticketTypeId ) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try {
    const postTicket = await ticketsService.postTicketTypeId(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(postTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
    
  try {
    const ticketFound = await ticketsService.getTicketsByEnrollmentUserId(userId);
    return res.status(httpStatus.OK).send(ticketFound);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticketTypeFound = await ticketsService.getTicketsTypeByEnrollmentUserId(userId);
    return res.status(httpStatus.OK).send(ticketTypeFound);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
