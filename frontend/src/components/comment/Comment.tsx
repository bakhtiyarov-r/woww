import React, { Component } from 'react';
import RButton from "../button/RButton";
import type { commentProps } from '../../types/commentProps';
import type { comment } from '../../types/comment';
import type { commentElem } from '../../types/commentElem'
import logo from '../../logo.svg';
import './Comment.scss';
import RTextarea from "../textarea/RTextarea";

type commentState = {
    isReplyActive: boolean;
    commentList: comment[] | undefined;
}

class Comment extends Component<commentProps, commentState>{
    constructor(props: commentProps) {
        super(props);
        this.state = {
            isReplyActive: false,
            commentList: this.props.comment.children,
        }

        this.textareaToggle = this.textareaToggle.bind(this);
        this.reply = this.reply.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    reply(ev: string) {
        if (!ev) {
            this.textareaToggle(false);
            return;
        }
        const commentList : comment[] = this.state.commentList || [];
        const comment = {
            id: Date.now(),
            parentId: this.props.comment.id,
            author: 'Noname',
            text: ev,
            created: new Date(),
        }
        commentList.push(comment);
        this.setState({
            commentList: commentList
        })
        this.textareaToggle(false);
        this.addComment(comment);
    }

    addComment(comment: commentElem) {
        const commentArr: commentElem[] = this.props.commentsArr;
        commentArr.push(comment)
        localStorage.setItem('commentsReddit', JSON.stringify(commentArr));
    }

    textareaToggle(val: boolean) {
        this.setState({isReplyActive: val});
    }

    shareToggle() {
        console.log('Share');
    }

    saveComment() {
        console.log('Save');
    }

    render() {
        const date = new Date(this.props.comment.created)
        let commentDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

        let comment;
        if (this.state.commentList) {
            comment = this.state.commentList.map((comment: comment) =>
                <Comment comment={comment}
                         commentsArr={this.props.commentsArr}
                         key={comment.id}
                         isChild={true}
                />
            );
        }
        let replyArea;
        if (this.state.isReplyActive) {
            replyArea = (<RTextarea onChange={this.reply}/>);
        }

        return (
            <div className={`comment ${this.props.isChild ? "comment_child" : ""}`}>
                <div className="comment_head">
                    <img src={logo} className="comment_avatar" alt="avatar" />
                    <div className="comment_author">
                        { this.props.comment.author }
                    </div>
                    <div className="comment_created">
                        { commentDate }
                    </div>
                </div>
                <div className="comment_line"/>
                <div className="comment_wrap">
                    <div className="comment_content">{ this.props.comment.text }</div>
                    <div className="comment_footer">
                        <RButton onButtonClick={ () => this.textareaToggle(true) } name="Ответить" />
                        <RButton onButtonClick={ this.shareToggle } name="Поделиться" />
                        <RButton onButtonClick={ this.saveComment } name="Сохранить" />
                    </div>
                    { replyArea }
                </div>
                <div className="comment__children">
                    { comment }
                </div>
            </div>
        );
    }
}



export default Comment;
