export type Languages = {
    size: number;
    node: {
        name: string;
    };
}
export type Repo = {
    id: string;
    name: string;
    url: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    languages: Languages[];
    [key: string]: any;
};