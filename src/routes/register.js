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
    console.log(managers)
    const itemsHandler = require('./handlers/items.js')({
        itemsManager: managers.itemsManager,
        itemsInteractionsManager: managers.itemsInteractionsManager
    });
    const feedHandler = require('./handlers/feed.js')({
        feedManager: managers.feedManager,
    });

    router.get('/faucet/receive/:username', faucetHandler.getTokenForUsername);

    router.get('/identity/:username', identitiesHandler.get);
    router.post('/identity/:username', identitiesHandler.post);


    router.get('/authors', identitiesHandler.get);
    router.post('/author/:nickname', identitiesHandler.post);

    router.get('/feed', feedHandler.get);


    router.get('/items', itemsHandler.getAll);
    router.get('/item/:itemIdentifier', itemsHandler.get);
    router.post('/item', itemsHandler.post);

    router.post('/item/:itemIdentifier/vote', itemsHandler.postVote);
    router.post('/item/:itemIdentifier/offer', itemsHandler.postOffer);

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
