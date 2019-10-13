import React, { Component } from 'react';
import RegisterFormDisplay from "./RegisterFormView";

export default class RegisterForm extends Component {

    changeToLoginForm = () => {
        this.props.onLoginWindowChange();
    };

    render() {
        return <RegisterFormDisplay changeToLoginForm={this.changeToLoginForm.bind(this)}/>;
    }
}
