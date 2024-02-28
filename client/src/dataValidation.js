export default function dataValidation(input) {
  const errors = {};
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const userNameRegex =  /[^\w-]/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const dateOfBirth = new Date(input.dateOfBirth);

  if (input.name && !nameRegex.test(input.name)) {
    errors.name = 'Must be a valid name';
  }
  if (input.surName && !nameRegex.test(input.surName)) {
    errors.surName = 'Must be a valid surname';
  }
  if (input.userName && userNameRegex.test(input.userName)) {
    errors.userName = 'Only valid symbols are - and _';
  }
  if (input.userName && (input.userName < 3 || input.userName > 128)) {
    errors.userName = 'Username must be between 3 and 128 characters';
  }
  if (input.dateOfBirth && (dateOfBirth > new Date(new Date().setFullYear(new Date().getFullYear() - 13)))) {
    errors.dateOfBirth = 'Date must be later than 13 years ago';
  }
  if (input.dateOfBirth && (dateOfBirth < new Date(new Date().setFullYear(new Date().getFullYear() - 150)))) {
    errors.dateOfBirth = 'Date must sooner than 150 years ago';
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = 'Must be a valid email';
  }
  if (input.email && input.email.length > 254) {
    errors.email = 'Email must be less than 254 characters';
  }
  if (input.currentEmail && (input.currentEmail !== '' && input.email !== '' && input.currentEmail === input.email)) {
    errors.email = 'Email must be different';
  }
  if (input.password && (input.password.length < 8 || input.password.length > 128)) {
    errors.password = 'Password must be between 8 and 128 characters';
  }
  if (input.repeatPassword && (input.password !== '' && input.repeatPassword !== '' && input.password !== input.repeatPassword)) {
    errors.repeatPassword = 'Password don\'t match';
  }
  if (input.changeUserInfoPassword && (input.changeUserInfoPassword.length < 8 || input.changeUserInfoPassword.length > 128)) {
    errors.changeUserInfoPassword = 'Password must be between 8 and 128 characters';
  }
  if (input.emailPassword && (input.emailPassword.length < 8 || input.emailPassword.length > 128)) {
    errors.emailPassword = 'Password must be between 8 and 128 characters';
  }
  return errors;
}