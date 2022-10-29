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
                publicKey
            }
        } = req
        try {
            if (!username) throw new MissingQueryParameterError(path, 'username')
            if (!address) throw new MissingBodyParameterError(path, 'address')
            if (!publicKey) throw new MissingBodyParameterError(path, 'publicKey')

            try {
                const resolvedIdentity = await identityManager.resolveIdentity({
                    username
                })
                if(resolvedIdentity && resolvedIdentity.address){
                    throw new Error('User has already a registered address');
                }
                const identity = {
                    username, address: address, publicKey: publicKey
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
    async function getToken (req, res, next){
        const {
            path,
            body: {
                signature,
                ts,
                address
            }
        } = req
        try {
            if (!signature) throw new MissingBodyParameterError(path, 'signature')
            if (!ts) throw new MissingBodyParameterError(path, 'ts')
            if (!address) throw new MissingBodyParameterError(path, 'address')

            try {
                const identity = await identityManager.resolveIdentity({
                    address
                })
                const {token} = await identityManager.getToken({
                    signature, ts, address
                })
                return res.json({ token, identity, error: false })
            } catch (e) {
                return next(e);
            }
        } catch (e) {
            return next(e);
        }
    }

    async function getIdentity (req, res, next) {

        const {
            path,
            params: {
                username,
                address
            }
        } = req
        try {
            if(!username && !address) throw new MissingBodyParameterError(path, 'username or address')

            try {
                const identity = await identityManager.resolveIdentity({
                    username, address
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
        getToken: getToken,
        post: postIdentity,
        get: getIdentity,
    }
}

module.exports = identitiesHandler
