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
            return handleResponse(
                res,
                OK,
                'Process Completed Successfully',
                response,
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
            const { ref, type } = payload;
            if(type === 'transactions') {
                const wallet = new WalletController()
                let trx = await wallet.web3.eth.getTransaction(ref);
                trx.value = await wallet.web3.utils.fromWei(trx.value, 'ether');
                trx.timestamp = new Date()
                return trx;
            }

            if(type === 'blocks') {
                const wallet = new WalletController()
                let trx = await wallet.web3.eth.getTransaction(ref);
                let block = await wallet.web3.eth.getBlock(trx.blockNumber);
                block.date = new Date(block.timestamp)
                return block;
            }
            
        } catch(error){
            winston.info(error)
            return error
        }
    }

    static async getByAddress (req, res, next) {
        try {
            const { address } = req.params;
            console.log(address, '<<===address')
            const wallet = new WalletController()
            let block = await wallet.web3.eth.getBlock(address, true);
            console.log(block, '<<===block')
            if(!block){
                winston.info('Not block found')
                return next(
                    createError({
                      status: NOT_FOUND,
                      message: 'No Block Found'
                    }),
                  );
            }
            block.date = new Date(block.timestamp)
            return handleResponse(
                res,
                OK,
                'Process Completed Successfully',
                block,
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