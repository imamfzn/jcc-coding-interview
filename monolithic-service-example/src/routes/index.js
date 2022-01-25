const { Router } = require('express');
const route = Router();

route.use('/auth', require('./auth'));
route.use('/users', require('./users'));
route.use('/events', require('./events'));
route.use('/wallets', require('./wallets'));

module.exports = route;
