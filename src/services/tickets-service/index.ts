import { notFoundErrorg, } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import userRepository from "@/repositories/user-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTickets(userId: number) {
  const idUserCheck = await  userRepository.findUserById(userId);
  if(!idUserCheck) throw notFoundError();

  const enrollmentCheck = await ticketsRepository.findEnrollmentId(idUserCheck.id);
    
  if ( !enrollmentCheck) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketWithTicketType(enrollmentCheck.id);

  if(!ticket) throw notFoundError();

  const { id, ticketTypeId, enrollmentId, status, createdAt, updatedAt }: Ticket= { ...ticket };
  const  ticketType: TicketType= { ...ticket.TicketType };
  const result = { id, status: status.toString(), ticketTypeId, enrollmentId, TicketType: ticketType, createdAt, updatedAt };

  return result;
}

async function getTicketsTypes(userId: number) {
  const idUserCheck = await  userRepository.findUserById(userId);
  if(!idUserCheck) throw notFoundError();

  const enrollmentCheck = await ticketsRepository.findEnrollmentId(idUserCheck.id);
    
  if ( !enrollmentCheck) {
    throw notFoundError();
  }
  const ticketsType = await ticketsRepository.findTicketsWithTicketTypeAll(enrollmentCheck.id);

  let result: TicketType[] = [];

  if(!ticketsType) {  
    return result;
  } 

  result = ticketsType.map( ticket => ticket.TicketType );

  return result;
}

async function postTicket(userId: number, idTicketType: number) {
  const idUserCheck = await  userRepository.findUserById(userId);
  if(!idUserCheck) throw notFoundError();

  const enrollmentCheck = await ticketsRepository.findEnrollmentId(idUserCheck.id);
    
  if ( !enrollmentCheck) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.createTicket(enrollmentCheck.id, idTicketType);
   
  const { id, ticketTypeId, enrollmentId, status, createdAt, updatedAt } = { ...ticket.createTicket };
  const  ticketType = { ...ticket.ticketType };
  const result = { id, status: status.toString(), ticketTypeId, enrollmentId, TicketType: ticketType, createdAt, updatedAt };

  return result;
}
const ticketsService = {
  postTicket,
  getTickets,
  getTicketsTypes
};
export default ticketsService;

