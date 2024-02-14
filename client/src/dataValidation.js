export default function dataValidation(input) {
  const errors = {};
  const regexEmail = /^\w+([.\-]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
  const dateOfBirth = new Date(input.dateOfBirth);

  if (input.dateOfBirth && (dateOfBirth > new Date(new Date().setFullYear(new Date().getFullYear() - 13)))) {
    errors.dateOfBirth = 'Date must be later than 13 years ago';
  }
  if (input.dateOfBirth && (dateOfBirth < new Date(new Date().setFullYear(new Date().getFullYear() - 150)))) {
    errors.dateOfBirth = 'Date must sooner than 150 years ago';
  }
  if (!regexEmail.test(input.email)) {
    errors.email = 'Must be a valid email';
  }
  if (input.email.length > 254) {
    errors.email = 'Email must be less than 254 characters';
  }
  if (input.password.length < 8 || input.password.length > 128) {
    errors.password = 'Password must be between 8 and 128 characters';
  }
  if (input.repeatPassword && (input.password !== '' && input.repeatPassword !== '' && input.password !== input.repeatPassword)) {
    errors.repeatPassword = 'Password don\'t match';
  }
  return errors;
}