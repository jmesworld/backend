const {NodeForage} = require("nodeforage");

class AuthorManager {
    constructor(props = {}) {
        this.fileStore = new NodeForage({ name: `authors.json` });
    }
};
AuthorManager.prototype.createAuthor = require('./methods/createAuthor.js')
AuthorManager.prototype.resolveAuthor = require('./methods/resolveAuthor.js')
module.exports = AuthorManager;
