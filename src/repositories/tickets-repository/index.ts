import { prisma } from "@/config";

async function findTicketByEnrollmentByUserId(userId: number) {
  const result =  prisma.enrollment.findUnique({
    where: {
      userId,
    },
    include: {
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });
  return result;
}

async function findTicketTypeId(userId: number, ticketTypeId: number) {
  const result = prisma.enrollment.findUnique({
    where: {
      userId,
    },
    include: {
      Ticket: {
        where: {
          ticketTypeId,
        },
        include: {
          TicketType: true,
        },
      }
    },
  });
  
  return result;
}

async function findTicketTypeByEnrollmentByUserId(userId: number) {
  const result =  prisma.enrollment.findUnique({
    where: {
      userId,
    },
    include: {
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });
  return result;
}
const ticketsRepository={
  findTicketByEnrollmentByUserId,
  findTicketTypeId,
  findTicketTypeByEnrollmentByUserId
};
export default ticketsRepository;
