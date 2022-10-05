const {NodeForage} = require("nodeforage");

class ItemsInteractionsManager {
    constructor(props = {}) {
        this.itemInteractionsStore = new NodeForage({ name: `items-interactions.json` });
        this.itemsManager = null;
    }
};
ItemsInteractionsManager.prototype.attachManager = require('./methods/attachManager');
ItemsInteractionsManager.prototype.updateItemVote = require('./methods/updateItemVote');
module.exports = ItemsInteractionsManager;
