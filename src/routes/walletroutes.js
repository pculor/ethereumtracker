const { Router } = require('express');
const { WalletController } = require('../controllers/WalletController');

const router = Router();

router.route('/:queryType')
  .get(WalletController.queryBlockchain);

module.exports = router;
