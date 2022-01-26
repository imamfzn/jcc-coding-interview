const EventService = require('../services/event');
const { sendResponse } = require('../lib/api');

module.exports = {
  createEvent(req, res, next) {
    EventService.createEvent({
      ...req.body,
      creatorId: req.user.id
    })
    .then(sendResponse(res))
    .catch(next);
  },

  getEventById(req, res, next) {
    EventService.getEventById(req.params.id).then(sendResponse(res)).catch(next);
  },

  getAllEvent(req, res, next) {
    EventService.getAllEvent().then(sendResponse(res)).catch(next);
  },

  getEventTickets(req, res, next) {
    EventService.getEventTickets(req.params.id).then(sendResponse(res)).catch(next);
  },

  createEventTicket(req, res, next) {
    EventService.createEventTicket({
      userId: req.user.id,
      eventId: req.params.id,
      ...req.body,
    })
    .then(sendResponse(res))
    .catch(next);
  },

  registerEvent(req, res, next) {
    EventService.registerEvent({
      userId: req.user.id,
      eventId: req.params.id,
      ticketId: req.body.ticketId,
    })
    .then(sendResponse(res))
    .catch(next);
  }
};
