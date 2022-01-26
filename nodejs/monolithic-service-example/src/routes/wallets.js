const { Router } = require('express');
const handler = require('../handlers/wallet');
const middleware = require('../middlewares');
const validation = require('../middlewares/validations');
const route = Router();

route.post('/topup', middleware.authorize("admin"), validation.topupWalletValidation, handler.topup);
route.get('/',middleware.authorize("admin"), handler.getAllWallet);

module.exports = route;
