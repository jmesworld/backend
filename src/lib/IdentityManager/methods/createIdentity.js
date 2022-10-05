async function createIdentity(createParams = {}){
    const { username, address } = createParams;
    if(!username) throw new Error('Required username');
    if(!address) throw new Error('Required address');
    console.log(`Create Identity ${username, address}`);
    return this.fileStore.setItem(username, address);
};

module.exports = createIdentity;
