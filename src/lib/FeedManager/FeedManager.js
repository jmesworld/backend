class FeedManager {
    constructor(props = {}) {
        this.itemsManager = null;
    }
};
FeedManager.prototype.attachManager = require('./methods/attachManager');
FeedManager.prototype.getFeed = require('./methods/getFeed');
module.exports = FeedManager;
