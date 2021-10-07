import React, { Component } from 'react';
import Comment from '../comment/Comment';
import type { commentElem } from '../../types/commentElem'

import './App.scss';
import RTextarea from "../textarea/RTextarea";

class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            commentsReddit: [],
        };

    }

    componentDidMount() {
        const commentsReddit: string = localStorage.getItem('commentsReddit') || "[]";
        this.setState({
            commentsReddit: JSON.parse(commentsReddit)
        })

        this.reply = this.reply.bind(this);
    }

    reply(ev: string) {
        const commentList : commentElem[] = this.state.commentsReddit
        const comment = {
            id: Date.now(),
            parentId: null,
            author: 'Noname',
            text: ev,
            created: new Date(),
        }
        commentList.push(comment);
        this.setState({
            commentsReddit: commentList
        })
        localStorage.setItem('commentsReddit', JSON.stringify(commentList));
    }

    render() {
        const commentList = this.state.commentsReddit
            .reduce((acc: commentElem[], comment: any) => {
                comment.children = this.state.commentsReddit.filter((i: commentElem) => i.parentId === comment.id)
                acc.push(comment);
                return acc;
            }, [])
            .filter((i: any) => i.parentId === null);

        const comment = commentList.map((comment: any) =>
            <Comment comment={comment}
                     commentsArr={this.state.commentsReddit}
                     key={comment.id}
            />);

        return (
            <div className="App">
                <header className="App-header">
                </header>
                <main>
                    <div className="comment-area">
                        <RTextarea onChange={this.reply}/>
                    </div>
                    <div className="comments">
                        {comment}
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
