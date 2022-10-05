async function resolveIdentity(searchParams = {}){
    const { username  } = searchParams;

    if(!username) throw new Error('Only username search allowed.');
    const address = await this.fileStore.getItem(username);
    console.log(`Resolve Identity`, {searchParams}, '=>', {address, username})
    return { address, username };
};
module.exports = resolveIdentity;
