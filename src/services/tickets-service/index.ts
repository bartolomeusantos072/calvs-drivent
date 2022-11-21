import { notFoundError, requestError, } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import userRepository from "@/repositories/user-repository";

async function getTicketsByEnrollmentUserId(userId: number) {
  const ticketByEnrollment = await ticketsRepository.findTicketByEnrollmentByUserId(userId);

  if (!ticketByEnrollment || ticketByEnrollment.Ticket.length < 1) {
    throw notFoundError();
  }

  return ticketByEnrollment.Ticket.map(
    function(ticket) {
      const {
        id,
        ticketTypeId,
        enrollmentId,
        status,
        createdAt,
        updatedAt
      } = { ...ticket };
      const { TicketType }= ticket;
      const result = { id, status, ticketTypeId, enrollmentId, TicketType, createdAt, updatedAt };
      return result;
    })[0];
}

async function getTicketsTypeByEnrollmentUserId(userId: number) {
  const ticketTypeByEnrollment =  await ticketsRepository.findTicketTypeByEnrollmentByUserId(userId);
    
  if (!ticketTypeByEnrollment) {
    throw notFoundError();
  }
    
  if(ticketTypeByEnrollment.Ticket.length ===0) {
    const empty: object[] = [];
    return empty;
  }
    
  return ticketTypeByEnrollment.Ticket.map(
    function(ticket) {
      const { TicketType }= ticket;
      const result = { ...TicketType };
      return result;
    })[0];
}

async function postTicket(userId: number, idTicketType: number) {
  const idUserCheck = await  userRepository.findUserById(userId);
  if(!idUserCheck) throw notFoundError();

  const enrollmentCheck = await ticketsRepository.findEnrollmentId(idUserCheck.id);
    
  if ( !enrollmentCheck) {
    throw notFoundError();
  }

  const ticketByTypes = await ticketsRepository.createTicket(enrollmentCheck.id, idTicketType);
   
  const { id, ticketTypeId, enrollmentId, status, createdAt, updatedAt } ={ ...ticketByTypes.createTicket };
  const  ticketType = { ...ticketByTypes.ticketType };
  const result = { id, status: status.toString(), ticketTypeId, enrollmentId, TicketType: ticketType, createdAt, updatedAt };

  return result;
}
const ticketsService = {
  postTicket,
  getTicketsByEnrollmentUserId,
  getTicketsTypeByEnrollmentUserId
};
export default ticketsService;

