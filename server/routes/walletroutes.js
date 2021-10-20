const { Router } = require('express');
const { WalletController } = require('../controllers/WalletController');

const router = Router();

router.route('/:queryType')
  .get(WalletController.queryBlockchain);

router.route('/wallet/:address')
  .get(WalletController.getByAddress);

module.exports = router;
