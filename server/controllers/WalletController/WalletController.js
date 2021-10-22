const Web3 = require('web3');
const winston = require('../../config/winston');
const { handleResponse,
    CREATED,
    OK } = require('../../utils/success');
const {createError,
    BAD_REQUEST,
    CONFLICT,
    NOT_FOUND,
    SERVER_ERROR,
    UNAUTHORIZED,
    FORBIDDEN } = require('../../utils/error')
require('dotenv').config()



class WalletController {
    projectId = process.env.PROJECT_ID;
    baseUrl = process.env.TEST_NET;
    web3 = new Web3(new Web3.providers.HttpProvider(`${this.baseUrl}${this.projectId}`));

    // constructor() {
    //     this.web3 = new Web3(new Web3.providers.HttpProvider(`${this.baseUrl}${this.projectId}`));
    // };
    

    static async queryBlockchain (req, res, next) {
        try{
            const wallet = new WalletController()
            // console.log(wallet, '<<<<<WalletController')
            const { queryType } = req.params

            const block = await wallet.web3.eth.getBlock('latest')

            if(!block){
                winston.info('Not block found')
                return next(
                    createError({
                      status: NOT_FOUND,
                      message: 'No Block Found'
                    }),
                  );
            }
            if(!['transactions', 'blocks'].includes(queryType)){
                return next(
                    createError({
                      status: NOT_FOUND,
                      message: 'Invalid route!'
                    }),
                  );
            }
            const queryList = queryType === 'transactions' ? [] : [block];
            for(let i=0; i < block.transactions.length; i += 1){
                let blockTrx = block.transactions[i];
                winston.info(blockTrx)
                
                queryList.push(WalletController.processData({ ref: blockTrx, type: queryType }));
            };
            const response = await Promise.all(queryList);
            const result = response.filter(item => item !== null && item !== undefined && !item.level)
            return handleResponse(
                res,
                OK,
                'Process Completed Successfully',
                result,
              );
        } catch(error){
            winston.info(error)
            return next(
                createError({
                  status: SERVER_ERROR,
                  message: `Something went wrong ${error}`,
                }),
              );
        }
    }

    static async processData (payload){
        try{
            // const { ref, type } = payload;
            if(payload.type === 'transactions') {
                const wallet = new WalletController()
                let trx = await wallet.web3.eth.getTransaction(payload.ref);
                trx.value = await wallet.web3.utils.fromWei(trx.value, 'ether');
                trx.timestamp = new Date()
                if(trx.from && trx.to) {
                    const out = {};
                    out['fromAddress'] = trx.from;
                    out['toAddress'] = trx.to;
                    out['amountETH'] = await wallet.web3.utils.fromWei(trx.value, 'ether');
                    // out['amountUSD'] = Math.random(blockTrx.value/(1000000000000000000 * 3440)).toFixed(2);
                    out['timestamp'] = new Date()
                return out;
                } 
            }

            if(payload.type === 'blocks') {
                const wallet = new WalletController()
                let trx = await wallet.web3.eth.getTransaction(payload.ref);
                let block = await wallet.web3.eth.getBlock(trx.blockNumber);
                block.date = new Date(block.timestamp)
                return block;
            }

            const wallet = new WalletController();
            const block = await wallet.web3.eth.getBlock(payload.ref, true);

            if(!block) return;

            for(let i=0; i < block.transactions.length; i += 1){
                let blockTrx = block.transactions[i];
                console.log(blockTrx, '<<==blockTrx')
                if(blockTrx.to === payload.address || blockTrx.from === payload.address) {
                    const out = {};
                    out['fromAddress'] = blockTrx.from;
                    out['toAddress'] = blockTrx.to;
                    out['amountETH'] = await wallet.web3.utils.fromWei(blockTrx.value, 'ether');
                    // out['amountUSD'] = Math.random(blockTrx.value/(1000000000000000000 * 3440)).toFixed(2);
                    out['timestamp'] = new Date()
                    return out;
                } else {
                    continue;
                } 
            };
            
        } catch(error){
            winston.info(error)
            return error
        }
    }

    static async getByAddress (req, res, next) {
        try {
            const { address } = req.params;
            const { startBlock } = req.query;
            const blockCache = [];
            console.log(address, '<<===address block ==>>>', startBlock)
            const wallet = new WalletController()
            // TODO get current block
            const currentBlockNumber = await wallet.web3.eth.getBlockNumber();
            // let currentBlock = await wallet.web3.eth.getBlock(currentBlockNumber);
            console.log(currentBlockNumber, '<<== currentBlock')
            for (let i = Number(startBlock); i < currentBlockNumber; i+=1) {
                console.log(i, '<<== traversed block', currentBlockNumber)
                blockCache.push(WalletController.processData({ ref: i, address }));
            };

            const response = await Promise.all(blockCache);
            const result = response.filter(item => item !== null && item !== undefined && !item.level)
            return handleResponse(
                res,
                OK,
                'Process Completed Successfully',
                result,
              );
        } catch(error){
            winston.info(error)
            return next(
                createError({
                  status: SERVER_ERROR,
                  message: `Something went wrong ${error}`,
                }),
              );
        }
        
    }
}


module.exports = WalletController;