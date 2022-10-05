const {NodeForage} = require("nodeforage");

class ItemsManager {
    constructor(props = {}) {
        this.itemStore = new NodeForage({ name: `items.json` });
    }

};
ItemsManager.prototype.createItem = require('./methods/createItem');
ItemsManager.prototype.listItems = require('./methods/listItems');
ItemsManager.prototype.resolveItem = require('./methods/resolveItem');
module.exports = ItemsManager;
