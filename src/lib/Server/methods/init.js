const { json: jsonParser } = require('body-parser');
const fileUpload = require('express-fileupload');

const connect = require('express');
const path = require('path');
const ItemsManager = require('../../ItemsManager/ItemsManager');
const ItemsInteractionsManager = require('../../ItemsInteractionsManager/ItemsInteractionsManager');
const IdentityManager = require('../../IdentityManager/IdentityManager');
const FaucetManager = require('../../FaucetManager/FaucetManager');
const FeedManager = require('../../FeedManager/FeedManager');
const routes = require('../../../routes');

const FAUCET_PRIVATE_KEY = '3043fe3011a50ea3e6015a2e650f83d13eb90bf65f2e5213a10c81f3c53e1a9e'
const VALIDATOR_PRIVATE_KEY = '21880b2e60c0440155bc3ecb7952610b00f15b53517379b7b0e546cf9d43d49b';
async function init () {
    console.info('Initializing Server');

    if (this.instance !== null) throw new Error('Instance is already initialized.');

    this.identityManager = new IdentityManager();
    await this.identityManager.init();

    this.itemsManager = new ItemsManager();

    this.feedManager = new FeedManager();
    this.itemsInteractionsManager = new ItemsInteractionsManager();

    this.feedManager.attachManager('itemsManager', this.itemsManager);
    this.itemsInteractionsManager.attachManager('itemsManager', this.itemsManager)

    try {
        // this.faucetManager = new FaucetManager({
        //     // privateKey: FAUCET_PRIVATE_KEY,
        //     // Mnemonic has a bug for now.
        //     // mnemonic: "april genre very monitor major enable ocean hello draft tray across another stick biology depth aim hamster view fly install sing pet order wash"
        //
        //     privateKey: VALIDATOR_PRIVATE_KEY
        // });
        // await this.faucetManager.init({
        //     password: '',
        // });

        // console.log('Faucet ready');
        // const sendTransactionRequest = await this.faucetManager.sendTransaction({
        //     address: "0x060Cf7c0972217F37dB63Ab44B9EdE9A41e0DEB4",
        //     amount: 8888
        // })
        // console.log({sendTransactionRequest});

    }catch (e){
        console.error('e');
    }

    const instance = connect();

    instance.use(fileUpload({
        createParentPath: true
    }));

    instance.use('/images', connect.static(path.join(__dirname, '../../../items')));
    instance.use(jsonParser());

    routes.register({
        server: instance,
        managers: {
            identityManager: this.identityManager,
            faucetManager: this.faucetManager,
            itemsManager: this.itemsManager,
            itemsInteractionsManager: this.itemsInteractionsManager,
            feedManager: this.feedManager
        }
    });

    this.instance = instance;
    return this;
}

module.exports = init
