const MissingBodyParameterError = require('../errors/MissingBodyParameterError')
const MissingQueryParameterError = require('../errors/MissingQueryParameterError')

function faucetHandler ({ faucetManager,identityManager } = {}) {
    async function getTokenForUsername (req, res, next) {
        const {
            params: {
                username
            },
        } = req
        try {
            if (!username) throw new MissingQueryParameterError(path, 'username')

            try {
                const resolvedIdentity = await identityManager.resolveIdentity({
                    username
                })
                if(!resolvedIdentity.address){
                    throw new Error('User is not a registered identity');
                }
                const sendParams = {
                    address: resolvedIdentity.address,
                    amount: 10
                }
                const sendTransactionRequest = await faucetManager.sendTransaction(sendParams);
                const txid = sendTransactionRequest.transactionHash;
                console.log({sendTransactionRequest})
                return res.json({  txid, error: false });
            } catch (e) {
                return next(e);
            }
        } catch (e) { console.error({ea2: e}); return next(e) }
    }

    return {
        getTokenForUsername
    }
}

module.exports = faucetHandler
