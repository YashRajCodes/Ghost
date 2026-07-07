const createFacade = require('../../../shared/container/create-facade');
const EmailAnalyticsServiceWrapper = require('./email-analytics-service-wrapper');

module.exports = createFacade('emailAnalytics', () => {
    const config = require('../../../shared/config');
    return new EmailAnalyticsServiceWrapper({
        models: require('../../models'),
        domainEvents: require('../../lib/common/domain-events'),
        settingsCache: require('../../../shared/settings-cache'),
        labs: require('../../../shared/labs'),
        membersService: require('../members'),
        emailSuppressionList: require('../email-suppression-list'),
        deploymentConfig: config,
        knex: require('../../data/db').knex
    });
});
