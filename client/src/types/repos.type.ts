import { Languages } from './languages.type';
export type Repo = {
    id: string;
    name: string;
    url: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    languages: Languages[];
};