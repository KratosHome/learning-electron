declare global {
    interface Window {
        storeAPI: {
            getValue: (key: string) => Promise<any>;
            setValue: (key: string, value: any) => Promise<void>;
        };
    }
}

export {};
