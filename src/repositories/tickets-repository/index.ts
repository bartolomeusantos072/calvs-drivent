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
async function findTicketTypeId(ticketTypeId: number) {
  const result =  await  prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    }
  });
  return result;
}
async function findTicketWithTicketType(enrollmentId: number) {
  const result =  await  prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
  return result;
}

async function findTicketsWithTicketTypeAll(enrollmentId: number) {
  const result =  await  prisma.ticket.findMany({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
  return result;
}

async function findEnrollmentId(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  const createTicket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
  });

  const ticketType = await findTicketTypeId(ticketTypeId);

  return {  createTicket, ticketType };
}

const ticketsRepository={
  findTicketByEnrollmentByUserId,
  findTicketsWithTicketTypeAll,
  findEnrollmentId,
  findTicketWithTicketType,
  findTicketTypeId,
  createTicket
};
export default ticketsRepository;
