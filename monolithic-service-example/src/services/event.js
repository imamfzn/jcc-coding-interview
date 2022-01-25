const Event = require('../models/event');
const Ticket = require('../models/ticket');
const EventRegistration = require('../models/event-registration');
const TransactionService = require('./transaction');

const {
  ResourceNotFoundError,
  ValidationError,
  EventTicketAlreadyUsedError,
  UserAlreadyRegisteredToEventError,
  EventAlreadyPassedError,
  ForbiddenError,
} = require('../lib/error');

function handleDBValidationError(error) {
  if (error.name === 'ValidationError') {
    throw new ValidationError(error?.errors?.description?.message || error.message);
  }

  throw error;
}

module.exports = {
  async getEventById(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw new ResourceNotFoundError('Event');
    }
  
    return event.toJSON();
  },

  async getAllEvent() {
    const events = await Event.find();

    return events.map(event => event.toJSON());
  },

  async createEvent({ name, description, creatorId }) {
    const event = new Event({ name, description, creatorId });

    try {
      await event.save();
    } catch (error) {
      handleDBValidationError(error);
    }
    
    return event.toJSON();
  },

  async getEventTickets(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw new ResourceNotFoundError('Event');
    }

    const tickets = await Ticket.find();

    return tickets.map(ticket => ticket.toJSON());
  },

  async createEventTicket({ userId, eventId, name, price, quota, date }) {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ResourceNotFoundError('Event');
    }

    if (event.creatorId != userId) {
      throw new ForbiddenError('You are not the event creator');
    }

    const ticket = new Ticket({ eventId, name, price, quota, date });

    try {
      await ticket.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new EventTicketAlreadyUsedError();
      }

      handleDBValidationError(error);
    }

    return ticket.toJSON();
  },

  async registerEvent({ userId, eventId, ticketId }) {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ResourceNotFoundError('Event');
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new ResourceNotFoundError('Ticket');
    }

    const now = new Date();
    if (ticket.date < now) {
      throw new EventAlreadyPassedError();
    }

    // check current registration
    const registered = await EventRegistration.exists({ userId, eventId, ticketId });
    if (registered) {
      throw new UserAlreadyRegisteredToEventError();
    }

    const item = {
      name: 'event_registration',
      details: {
        eventId,
        ticketId,
      },
    };

    const trx = await TransactionService.pay({ userId, item, amount: ticket.price });
    const registration = await EventRegistration.create({ userId, eventId, ticketId });

    return {
      transactionId: trx.id,
      registrationId: registration.id,
      eventId,
      ticketId,
    };
  },
};
