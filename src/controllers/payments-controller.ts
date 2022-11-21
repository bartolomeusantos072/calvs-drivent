import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { CardData } from "@/protocols";
 
export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const idUser= Number(req.userId);
  if(!idUser) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  const idTicket = Number(req.query.ticketId);
  if(!idTicket) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const payment = await paymentsService.getPaymentByTicketId(idUser, idTicket);
    return res.sendStatus(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const idUser= Number(req.userId);
  const ticketIdBody = Number(req.body.ticketId );
  const cardDataBody: CardData = req.body.cardData;

  if(!idUser) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  
  if(!ticketIdBody || !cardDataBody) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const processPayment = await paymentsService.postPayments(idUser, ticketIdBody, cardDataBody);
    return res.status(httpStatus.OK).send(processPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
