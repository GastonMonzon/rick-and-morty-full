export default function registerValidation(input) {
  const errors = {};
  const regexEmail = /^\w+([.\-]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,3})+$/;

  const dateOfBirth = new Date(input.dateOfBirth);

  if (dateOfBirth > new Date(new Date().setFullYear(new Date().getFullYear() - 13))) {
    errors.dateOfBirth = 'Date must be later than 13 years ago';
  }
  if (dateOfBirth < new Date(new Date().setFullYear(new Date().getFullYear() - 150))) {
    errors.dateOfBirth = 'Date must sooner than 150 years ago';
  }
  if(!regexEmail.test(input.registerEmail)) {
      errors.registerEmail = 'Must be a valid email';
  }
  if(input.registerEmail.length > 254){
      errors.registerEmail = 'Email must be less than 254 characters';
  }
  if(input.registerPassword.length < 8 || input.registerPassword.length > 128){
      errors.registerPassword = 'Password must be between 8 and 128 characters';
  }
  if(input.registerPassword !== '' && input.registerPasswordRepeat !== '' && input.registerPassword !== input.registerPasswordRepeat) {
    errors.registerPasswordRepeat = 'Password don\'t match';
  }
  return errors;
}