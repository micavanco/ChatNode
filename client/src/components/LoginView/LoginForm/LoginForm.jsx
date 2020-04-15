import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginActions from '../../../redux/login/actions';
import validateLogin from '../../../shared/Validations'

import LoginFormView from "./LoginFormView";

class LoginForm extends Component {

    constructor(params) {
        super(params);
        this.state = {
            username: '',
            password: '',
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
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.props.history, this.state);
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
            error={this.props.error}
            isLoading={this.props.isLoading}
        />;
    }
}

function mapStateToProps(state) {
    return {
        error: state.loginReducer.error,
        isLoading: state.loginReducer.isLoading,
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps, { login: loginActions.login })(LoginForm);
