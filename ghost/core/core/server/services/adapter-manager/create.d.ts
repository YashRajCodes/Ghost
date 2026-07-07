declare function createAdapterManager(options: {adapterPaths: string[]}): {
    getAdapter(adapterName: string, adapterClassName: string, config?: object): unknown;
    clearInstanceCache(): void;
};

export = createAdapterManager;
