const getAdapterServiceConfig = require('./config');
const resolveAdapterOptions = require('./options-resolver');
const config = require('../../../shared/config');
const createAdapterManager = require('./create');

let legacyManager;

// Legacy path for processes that never boot the container (CLI tools, bare unit tests)
const resolveManager = () => {
    const {hasDefaultScope, getCurrentScope} = require('../../../shared/container/current');
    if (hasDefaultScope()) {
        return getCurrentScope().resolve('adapterManager');
    }
    legacyManager = legacyManager || createAdapterManager({
        adapterPaths: ['', config.getContentPath('adapters'), config.get('paths').internalAdaptersPath]
    });
    return legacyManager;
};

module.exports = {
    /**
     *
     * @param {string} name - one of 'storage', 'scheduling', 'sso', 'cache' etc. Or can contain a "resource" extension like "storage:image"
     * @returns {Object} instance of an adapter
     */
    getAdapter(name) {
        const adapterServiceConfig = getAdapterServiceConfig(config);

        const {adapterClassName, adapterConfig} = resolveAdapterOptions(name, adapterServiceConfig);

        return resolveManager().getAdapter(name, adapterClassName, adapterConfig);
    },

    /**
     * Force recreation of all instances instead of reusing cached instances. Use when editing config file during tests.
     */
    clearCache() {
        resolveManager().clearInstanceCache();
    }
};
