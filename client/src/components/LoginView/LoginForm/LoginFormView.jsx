import React from 'react';

import "./LoginForm.scss";

const LoginFormDisplay = ({changeToRegisterForm}) => {
    return (
        <div className="login">
            <h2>Login</h2>
            <div className="login__form">
                <div className="login__form__username">
                    <label htmlFor="login__form__username__input">Username</label>
                    <input id="login__form__username__input" className="login__form__username__input" type="text" placeholder="Username"/>
                </div>

                <div className="login__form__password">
                    <label htmlFor="login__form__password__input">Password</label>
                    <input id="login__form__password__input" className="login__form__password__input" type="text" placeholder="Password"/>
                </div>

                <button className="login__form__submit" type="submit">Submit</button>
            </div>
            <div className="login__links">
                <a onClick={changeToRegisterForm}>Not have Account yet?</a>
            </div>
        </div>
    );
};

export default LoginFormDisplay;
