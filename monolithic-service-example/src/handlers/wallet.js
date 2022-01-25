const WalletService = require('../services/wallet');
const { sendResponse } = require('../lib/api');

module.exports = {
  topup(req, res, next) {
    WalletService.topup(req.body).then(sendResponse(res)).catch(next);
  },

  getAllWallet(req, res, next) {
    WalletService.getAllWallet().then(sendResponse(res)).catch(next);
  }
};
