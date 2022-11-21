import { notFoundError, unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(userId: number, ticketId: number) {
  const ticketIdCheck = await paymentsRepository.getTicketById(ticketId);
  if(!ticketIdCheck)throw notFoundError();

  const ticketIdWithUseId = await paymentsRepository.getTicketByIdWithUserId(userId, ticketId);

  if(ticketIdWithUseId.Ticket.length < 1) throw unauthorizedError;
  
  const payment = await paymentsRepository.getPaymentByTicketId(ticketId);
  if (!payment.ticketId) throw notFoundError();
  return payment;
}

async function postPayments(userId: number, ticketId: number, cardData: CardData) {
  const ticketIdCheck = await paymentsRepository.getTicketById(ticketId);
  if(!ticketIdCheck)throw notFoundError();

  const ticketIdWithUseId = await paymentsRepository.getTicketByIdWithUserId(userId, ticketId);

  if(ticketIdWithUseId.Ticket.length < 1) throw unauthorizedError;
  
  const { price } = await paymentsRepository.valuePayment(ticketIdWithUseId.Ticket[0].ticketTypeId);

  const processPayment = await paymentsRepository.postPayment(ticketId, cardData, price);
  return processPayment;  
}
const paymentsService = {
  getPaymentByTicketId,
  postPayments,

};

export default paymentsService;
