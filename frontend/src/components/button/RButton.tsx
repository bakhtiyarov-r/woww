import React, { Component } from 'react';
import './RButton.scss';

class RButton extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick() {
        this.props.onButtonClick();
    }

    render() {
        return (
            <button className="button" onClick={ this.buttonClick }>
                <i className="button_text">{ this.props.name }</i>
            </button>
        );
    }
}



export default RButton;
