import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";
 
export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const idTicket = Number(req.query.ticketId);
  if(!idTicket) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const payment = await paymentsService.getPaymentByTicketId(idTicket);
    return res.sendStatus(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

// export async function postPayments(req:AuthenticatedRequest,res:Response){
// };
