const { ResourceNotFoundError } = require('../lib/error');
const User = require('../models/user');
const Wallet = require('../models/wallet');

module.exports = {
  async topup({ userId, amount }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    const wallet = await Wallet.topup(userId, amount);

    return wallet.toJSON();
  },

  async getAllWallet() {
    const wallets = await Wallet.find();

    return wallets.map(wallet => wallet.toJSON());
  }
}
