type comment = {
    id: number;
    parentId: number | null;
    children?: [];
    author: string;
    text: string;
    created: Date;
};

export type { comment };