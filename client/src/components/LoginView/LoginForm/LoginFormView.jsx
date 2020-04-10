import React from 'react';

import "./LoginForm.scss";

const LoginFormView = ({changeToRegisterForm, onSubmitFunction, onChangeValueCheck, state}) => {
    return (
        <div className="login">
            <h2>Login</h2>
            <form className="login__form" onSubmit={onSubmitFunction}>
                <div className="login__form__username">
                    <label htmlFor="login__form__username__input">Username</label>
                    <input id="login__form__username__input"
                           className="login__form__username__input"
                           type="text"
                           name="username"
                           placeholder="Username"
                           onChange={onChangeValueCheck}
                           onBlur={onChangeValueCheck}
                           onFocus={onChangeValueCheck}
                    />
                    {
                        state.errors.username ? state.errors.username.map(error =>
                                <div key={'user' + error.slice(2)} className="login__form__username__error">{error}</div>
                            ) : ''
                    }

                </div>

                <div className="login__form__password">
                    <label htmlFor="login__form__password__input">Password</label>
                    <input id="login__form__password__input"
                           className="login__form__password__input"
                           type="password"
                           name="password"
                           placeholder="Password"
                           onChange={onChangeValueCheck}
                           onBlur={onChangeValueCheck}
                           onFocus={onChangeValueCheck}
                    />
                    {
                        state.errors.password ? state.errors.password.map(error =>
                            <div key={'pass' + error.slice(2)} className="login__form__password__error">{error}</div>
                        ) : ''
                    }
                </div>

                <button className="login__form__submit" type="submit" disabled={state.isLoading}>Submit</button>
            </form>
            <div className="login__links">
                <div onClick={changeToRegisterForm}>Not have Account yet?</div>
            </div>
        </div>
    );
};

export default LoginFormView;
