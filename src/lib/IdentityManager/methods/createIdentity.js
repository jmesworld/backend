async function createIdentity(createParams = {}){
    const { username, address, publicKey } = createParams;
    if(!username) throw new Error('Required username');
    if(!address) throw new Error('Required address');
    if(!publicKey) throw new Error('Required publicKey');
    console.log(`Create Identity ${username, address, publicKey}`);
    return this.fileStore.setItem(username,{publicKey, address});
};

module.exports = createIdentity;
