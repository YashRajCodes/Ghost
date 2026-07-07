const AdapterManager = require('./adapter-manager');

/**
 * @param {object} options
 * @param {string[]} options.adapterPaths - locations to look up adapter classes, in priority order
 */
module.exports = function createAdapterManager({adapterPaths}) {
    const adapterManager = new AdapterManager({
        loadAdapterFromPath: require,
        pathsToAdapters: adapterPaths
    });

    adapterManager.registerAdapter('storage', require('ghost-storage-base'));
    adapterManager.registerAdapter('scheduling', require('../../adapters/scheduling/scheduling-base'));
    adapterManager.registerAdapter('sso', require('../../adapters/sso/SSOBase'));
    adapterManager.registerAdapter('cache', require('@tryghost/adapter-base-cache'));
    adapterManager.registerAdapter('redirects', require('../../adapters/redirects/RedirectsStoreBase'));

    return adapterManager;
};
