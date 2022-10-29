async function updateItemVote(updateItemVoteParams){
    const {
        itemIdentifier,
        direction,
        userIdentifier
    } = updateItemVoteParams;
    if(!itemIdentifier) throw new Error('Required itemIdentifier');
    if(!userIdentifier) throw new Error('Required userIdentifier');
    if(direction == null) throw new Error('Required direction');

    return this.itemInteractionsStore.setItem(`${itemIdentifier}-${userIdentifier}`, {direction});
};
module.exports = updateItemVote;
