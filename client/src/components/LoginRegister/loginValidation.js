export default function loginValidation(input) {
  const errors = {};
  const regexEmail = /^\w+([.\-]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,3})+$/;

  if (!regexEmail.test(input.loginEmail)) {
    errors.loginEmail = 'Must be a valid email';
  }
  if (!input.loginEmail) {
    errors.loginEmail = 'Email is empty';
  }
  if (input.loginEmail.length > 254) {
    errors.loginEmail = 'Email must be less than 254 characters';
  }
  if (input.loginPassword.length < 8 || input.loginPassword.length > 128) {
    errors.loginPassword = 'Password must be between 8 and 128 characters';
  }
  return errors;
}