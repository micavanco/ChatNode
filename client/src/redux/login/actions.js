import userService from '../../lib/userService';
import { loginActions } from '../actionsTypes';

const login = (history, data) => {
    return dispatch => {
        dispatch(request(data.username));

        userService.login(data.username, data.password).then(
            res => {
                dispatch(success(data.username));
                localStorage.setItem('user', 'logged');
                console.log(res);
                history.push('/');
            },
            error => dispatch(failure('Wrong username or/and password...'))
        );
    }
};

const request = user => {return {type: loginActions.LOGIN_REQUEST, user}};
const success = user => {return {type: loginActions.LOGIN_SUCCESSFUL, user}};
const failure = error => {return {type: loginActions.LOGIN_FAILURE, error}};

export default { login };
