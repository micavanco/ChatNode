import isEmpty from 'lodash/isEmpty';

export default function validateLogin(data) {
    let errors = {};

    if(data.username === '') {
        errors.username = ['This field is required.'];
    }

    if(data.password === '') {
        errors.password = ['This field is required.'];
    }

    // console.log(data.password);

    return {
     errors,
     isValid: isEmpty(errors)
    }
};
