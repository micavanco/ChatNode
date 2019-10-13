import React from 'react';

import "./RegisterForm.scss";

const RegisterFormDisplay = ({changeToLoginForm}) => {
    return (
        <div className="register">
            <h2>Create new User</h2>
            <div className="register__form">
                <div className="register__form__username">
                    <label htmlFor="register__form__username__input">Username</label>
                    <input id="register__form__username__input" className="register__form__username__input" type="text" placeholder="Username"/>
                </div>

                <div className="register__form__password">
                    <label htmlFor="register__form__password__input">Password</label>
                    <input id="register__form__password__input" className="register__form__password__input" type="text" placeholder="Password"/>
                </div>

                <div className="register__form__password">
                    <label htmlFor="register__form__password__input2">Confirm Password</label>
                    <input id="register__form__password__input2" className="register__form__password__input2" type="text" placeholder="Confirm Password"/>
                </div>

                <div className="register__form__name">
                    <label htmlFor="register__form__name__input">Name</label>
                    <input id="register__form__name__input" className="register__form__name__input" type="text" placeholder="Name"/>
                </div>

                <div className="register__form__surname">
                    <label htmlFor="register__form__surname__input">Surname</label>
                    <input id="register__form__surname__input" className="register__form__surname__input" type="text" placeholder="Surname"/>
                </div>

                <button className="register__form__submit" type="submit">Create Account</button>
            </div>
            <div className="register__links">
                <a onClick={changeToLoginForm}>Login user</a>
            </div>
        </div>
    );
};

export default RegisterFormDisplay;
