import type { comment } from './comment';
import type { commentElem } from './commentElem'


type commentProps = {
    isChild?: boolean;
    comment: comment;
    commentsArr: commentElem[];
};

export type { commentProps };