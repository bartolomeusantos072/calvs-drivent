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
async function postTicketTypeId(userId: number, idTicketType: number) {
  if(!idTicketType ) {
    throw requestError(400, "Bad Request");
  } 
 
  const verifyUserId = await  userRepository.findUserById(userId);
  if(!verifyUserId) throw notFoundError();

  const ticketByTypes = await ticketsRepository.findTicketTypeId(userId, idTicketType);
    
  if (!ticketByTypes|| ticketByTypes.Ticket.length === 0) {
    throw notFoundError();
  }
  
  const result = ticketByTypes.Ticket.map(
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

  return result;
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
const ticketsService = {
  postTicketTypeId,
  getTicketsByEnrollmentUserId,
  getTicketsTypeByEnrollmentUserId
};
export default ticketsService;

