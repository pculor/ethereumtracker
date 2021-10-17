const { Router } = require('express');
const walletroutes = require('./walletroutes');

const router = Router();

router.use('/wallet', walletroutes);

module.exports = router;
