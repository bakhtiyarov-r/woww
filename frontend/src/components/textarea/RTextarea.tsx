import React, { Component } from 'react';
import RButton from "../button/RButton";
import './RTextarea.scss';

class RTextarea extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.emitChange = this.emitChange.bind(this);
    }

    handleChange(ev: any){
        this.setState({
            text: ev.target.textContent,
        })
    };

    emitChange(){
        this.props.onChange(this.state.text)
    };

    render() {
        return (
            <div className="comment_textarea">
                <div className="textarea"
                     contentEditable={true}
                     onInput={this.handleChange}
                >
                </div>
                <div className="textarea_btn">
                    <RButton onButtonClick={this.emitChange} name="Ответить" />
                </div>
            </div>
        );
    }
}



export default RTextarea;
