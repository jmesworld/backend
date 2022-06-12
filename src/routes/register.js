const { Router } = require('express')
const cors = require("cors");
const router = Router()


const register = function ({ server, managers }) {
    server.use(cors({
        origin: '*'
    }));

    const identitiesHandler = require('./handlers/identities.js')({
        identityManager: managers.identityManager
    });
    const faucetHandler = require('./handlers/faucet.js')({
        identityManager: managers.identityManager,
        faucetManager: managers.faucetManager
    });

    router.get('/faucet/receive/:username', faucetHandler.getTokenForUsername);
    router.get('/identity/:username', identitiesHandler.get);
    router.post('/identity/:username', identitiesHandler.post);

    server.use('/', router);


    server.get('/', function (req, res) {
        res.send('OK');
    });

    server.get('*', function (req, res) {
        throw { status: 404, message: 'Not found' } // eslint-disable-line
    });
    server.post('*', function (req, res) {
        throw { status: 404, message: 'Not found' } // eslint-disable-line
    });
    server.use(function (err, req, res, next) {
        console.log(+new Date(), err);
        res.status(err.status || 404).json({
            error: true,
            status: err.status || 404,
            message: err.message
        });
    });
}
module.exports = register
