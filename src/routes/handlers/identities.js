const MissingBodyParameterError = require('../errors/MissingBodyParameterError')
const MissingQueryParameterError = require('../errors/MissingQueryParameterError')

function identitiesHandler ({ identityManager } = {}) {
    async function postIdentity (req, res, next) {
        const {
            path,
            params: {
                username
            },
            body: {
                address,
            }
        } = req
        try {
            if (!username) throw new MissingQueryParameterError(path, 'username')
            if (!address) throw new MissingBodyParameterError(path, 'address')

            try {
                const resolvedIdentity = await identityManager.resolveIdentity({
                    username
                })
                if(resolvedIdentity.address){
                    throw new Error('User has already a registered address');
                }
                const identity = {
                    username, address: address
                };
                const identityCreated = await identityManager.createIdentity(identity)
                if(identityCreated){
                    return res.json({  identity, error: false });
                }
            } catch (e) {
                return next(e);
            }
        } catch (e) { console.error({ea2: e}); return next(e) }
    }

    async function getIdentity (req, res, next) {

        const {
            path,
            params: {
                username
            }
        } = req
        try {
            if (!username) throw new MissingBodyParameterError(path, 'username')

            try {
                const identity = await identityManager.resolveIdentity({
                    username
                })
                if(!identity.address){
                    throw new Error(`Identity ${username} is not registered.`);
                }
                return res.json({ identity: identity, error: false })
            } catch (e) {
                return next(e);
            }
        } catch (e) {
            return next(e);
        }
    }

    return {
        post: postIdentity,
        get: getIdentity
    }
}

module.exports = identitiesHandler
