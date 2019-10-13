import React, { Component } from 'react';
import LoginForm from "../components/LoginView/LoginForm/LoginForm";
import RegisterForm from "../components/LoginView/RegisterForm/RegisterForm";


export default class LoginView extends Component {
    constructor(params) {
        super(params);

        this.state = {
            isLoginWindowOn: true,
            isRegisterWindowOn: false };
    }

    onLoginWindowChange = () => {
        this.setState({
            isLoginWindowOn: true,
            isRegisterWindowOn: false
        });
    };

    onRegisterWindowChange = () => {
        this.setState({
            isLoginWindowOn: false,
            isRegisterWindowOn: true
        });
    };

    render = () => {
      let isLoginOn = this.state.isLoginWindowOn;
      return (
          isLoginOn === true ? <LoginForm onRegisterWindowChange={this.onRegisterWindowChange.bind(this)}/> : <RegisterForm onLoginWindowChange={this.onLoginWindowChange.bind(this)}/>
      );
    };
}
