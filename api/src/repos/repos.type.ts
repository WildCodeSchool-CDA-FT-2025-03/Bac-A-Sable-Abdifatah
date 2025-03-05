export type Repo = {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    labels: {
        id: string;
        name: string;
        description: string;
        color: string;
    }[];
    languages: {
        size: number;
        node: {
            name: string;
        };
    }[];
};