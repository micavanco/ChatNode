import React, { Component } from 'react';
import LoginFormDisplay from "./LoginFormView";

export default class LoginForm extends Component{

    changeToRegisterForm = () => {
        this.props.onRegisterWindowChange();
    };

    render() {
        return <LoginFormDisplay changeToRegisterForm={this.changeToRegisterForm.bind(this)}/>;
    }
}
