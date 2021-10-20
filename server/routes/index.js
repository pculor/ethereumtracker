const { Router } = require('express');
const walletroutes = require('./walletroutes');

const router = Router();

router.use('/eth', walletroutes);

module.exports = router;
