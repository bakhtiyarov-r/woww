type commentElem = {
    id: number;
    parentId: number | null;
    author: string;
    text: string;
    created: Date;
};

export type { commentElem };