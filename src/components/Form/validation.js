export default function validation(input) {
    const errors = {};
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPass = new RegExp('[0-9]');

    if(!regexEmail.test(input.email)) {
        errors.email = 'Username must be a valid email';
    }
    if(!input.email){
        errors.email = 'Username is empty';
    }
    if(input.email.length > 35){
        errors.email = 'Username must be less than 35 characters';
    }
    if(!regexPass.test(input.password)) {
        errors.password = 'Password must contain at least 1 number';
    }
    if(input.password.length < 6 || input.password.length > 10){
        errors.password = 'Password must be between 6 and 10 characters';
    }
    return errors;
}