import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(ticketId: number) {
  const ticketExist = await paymentsRepository.getTicketById(ticketId);
  if(!ticketExist)throw notFoundError();

  const payment = await paymentsRepository.getPaymentByTicketId(Number(ticketId));
  if (!payment.ticketId) throw notFoundError();
  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
};

export default paymentsService;
