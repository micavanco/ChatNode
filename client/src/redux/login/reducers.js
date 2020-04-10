import ACTION_TYPES from '../actionsTypes';

const INITIAL_STATE = {
    loginStatus: false,
    user: {}
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOG_IN:
            return {
                ...state,
                loginStatus: true
            };
        default:
            return state;
    }
};

export default loginReducer;
