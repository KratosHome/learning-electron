
declare global {
    interface Window {
        electron: any;
        versions: {
            node: () => string;
            chrome: () => string;
            electron: () => string;
            ping: () => Promise<string>;
        };
        storeAPI: {
            getValue: (key: string) => Promise<any>;
            setValue: (key: string, value: any) => Promise<void>;
        };
    }
}

export {};
