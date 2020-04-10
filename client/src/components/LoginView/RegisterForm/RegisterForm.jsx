import React, { Component } from 'react';
import RegisterFormView from "./RegisterFormView";

export default class RegisterForm extends Component {

    changeToLoginForm = () => {
        this.props.onLoginWindowChange();
    };

    render() {
        return <RegisterFormView changeToLoginForm={this.changeToLoginForm.bind(this)}/>;
    }
}
