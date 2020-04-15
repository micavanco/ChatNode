import { loginActions } from '../actionsTypes';

const INITIAL_STATE = {
    isLoading: false,
    user: '',
    error: ''
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loginActions.LOGIN_REQUEST:
            return {
                ...state,
                user: action.user,
                isLoading: true
            };
        case loginActions.LOGIN_SUCCESSFUL:
            return {
                ...state,
                user: action.user,
                error: '',
                isLoading: false
            };
        case loginActions.LOGIN_FAILURE:
            return {
                ...state,
                user: '',
                error: action.error,
                isLoading: false
            };
        default:
            return state;
    }
};

export default loginReducer;
