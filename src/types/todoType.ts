export interface todoType {
    id: number;
    date: string | null;
    timeStart: string | null;
    timeEnd: string | null;
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
    date: string | null;
    timeStart: string | null;
    timeEnd: string | null;
    timer: number;
    title: string;
    text: string;
    pathMD: string;
    completed: boolean;
    notifications: boolean;
    delete: boolean;
}
