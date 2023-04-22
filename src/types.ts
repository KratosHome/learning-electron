export interface Item {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: Item[];
}
