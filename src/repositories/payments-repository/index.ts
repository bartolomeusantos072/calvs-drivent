import { prisma } from "@/config";
import { CardData } from "@/protocols";

async function getTicketById(ticketId: number) {
  const result = prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return result;
}

async function getTicketByIdWithUserId(userId: number, ticketId: number) {
  const result = await prisma.enrollment.findFirst({
    where: {
      userId,
    },
    include: {
      Ticket: {
        include: {
          Payment: {
            where: {
              ticketId,
            }
          },
        }
      },
    }
  });
  return result;
}

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function valuePayment(ticketTypeId: number) {
  return await prisma.ticketType.findUnique({
    where: { id: ticketTypeId }
  });
}

async function postPayment(ticketId: number, cardData: CardData, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer, 
      cardLastDigits: cardData.number.toString(),
      value,
    }
  }); 
}

const paymentsRepository = {
  getTicketById,
  getTicketByIdWithUserId,
  getPaymentByTicketId,
  valuePayment,
  postPayment

};

export default paymentsRepository;
