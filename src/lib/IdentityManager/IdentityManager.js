const {NodeForage} = require('nodeforage');
class IdentityManager {
    constructor() {
        this.fileStore = new NodeForage({ name: `identities.json` });
    }
    async init(){
        await this.fileStore.init();
    }
};
IdentityManager.prototype.createIdentity = require('./methods/createIdentity');
IdentityManager.prototype.resolveIdentity = require('./methods/resolveIdentity');
IdentityManager.prototype.getToken = require('./methods/getToken');
module.exports = IdentityManager;
