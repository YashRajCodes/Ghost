declare class EmailAnalyticsServiceWrapper {
    constructor(deps: {
        models: object;
        domainEvents: object;
        settingsCache: object;
        labs: object;
        membersService: object;
        emailSuppressionList: object;
        deploymentConfig: {get: (key: string) => unknown};
        knex: object;
    });
    init(): void;
}

export = EmailAnalyticsServiceWrapper;
