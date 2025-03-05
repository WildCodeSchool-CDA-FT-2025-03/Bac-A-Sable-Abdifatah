export type Repo = {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    languages: {
        size: number;
        node: {
            name: string;
        };
    }[];
};