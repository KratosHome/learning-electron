export interface todoType {
    id: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    timer: number;
    title: string;
    text: string;
    pathMD: string;
    completed: boolean;
    notifications: boolean;
    delete: boolean;
    subTodo: SubTask[];
}

interface SubTask {
    id: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    timer: number;
    title: string;
    text: string;
    pathMD: string;
    completed: boolean;
    notifications: boolean;
    delete: boolean;
}
