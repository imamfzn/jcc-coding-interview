module.exports = {
  tokenValidation: require('./token'),
  loginValidation: require('./login'),
  registerValidation: require('./register'),
  userIdParamValidation: require('./user-id-param'),
  eventIdParamValidation: require('./event-id-param'),
  createEventValidation: require('./create-event'),
  createEventTicketValidation: require('./create-event-ticket'),
  registerEventValidation: require('./register-event'),
  topupWalletValidation: require('./topup-wallet'),
};
