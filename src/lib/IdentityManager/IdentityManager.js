const {NodeForage} = require('nodeforage');
class IdentityManager {
    constructor() {
        this.fileStore = new NodeForage({ name: `identities.json` });
    }
    async init(){
        await this.fileStore.init();
    }
    async resolveIdentity(searchParams = {}){
        const { username  } = searchParams;

        if(!username) throw new Error('Only username search allowed.');
        const address = await this.fileStore.getItem(username);
        console.log(`Resolve Identity`, {searchParams}, '=>', {address, username})
        return { address, username };
    }
    async createIdentity(createParams = {}){
        const { username, address } = createParams;
        if(!username) throw new Error('Required username');
        if(!address) throw new Error('Required address');
        console.log(`Create Identity ${username, address}`);
        return this.fileStore.setItem(username, address);
    }

};
module.exports = IdentityManager;
