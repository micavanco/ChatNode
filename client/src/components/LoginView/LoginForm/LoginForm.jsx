import React, { Component } from 'react';
import { connect } from 'react-redux';
import login from '../../../redux/login/actions';
import validateLogin from '../../../shared/Validations'

import LoginFormView from "./LoginFormView";

class LoginForm extends Component {

    constructor(params) {
        super(params);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errors: {}
        };
    }

    isValid = () => {
        const { errors, isValid } = validateLogin(this.state);

        if(!isValid) {
            this.setState({ errors });
        }

        return isValid;
    };

    onSubmit = e => {
        e.preventDefault();
        if(this.isValid()) {

        }
    };

    onChangeValueCheck = e => {
        const { errors } = validateLogin(this.state);
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    };

    changeToRegisterForm = () => {
        this.props.onRegisterWindowChange();
    };

    render() {
        return <LoginFormView
            changeToRegisterForm={this.changeToRegisterForm.bind(this)}
            onSubmitFunction={this.onSubmit.bind(this)}
            onChangeValueCheck={this.onChangeValueCheck.bind(this)}
            state={this.state}
        />;
    }
}

export default connect(null, { login })(LoginForm);
