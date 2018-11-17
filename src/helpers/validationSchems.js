export const forgotPasswordDataSchema = {
  email: {
    email: true,
    required: { error: 'Please supply the email' }
  }
};

export const loginDataSchema = {
  email: {
    email: true,
    required: { error: 'Please supply the email' }
  },
  password: {
    required: { error: 'Please supply the password' }
  }
};

export const signupDataSchema = {
  email: {
    email: true,
    required: { error: 'Please supply the email' }
  },
  password: {
    required: { error: 'Please supply the password' }
  },
  name: {
    required: { error: 'Please supply the name' }
  },
  surname: {
    required: { error: 'Please supply the surname' }
  },
  specialization: {
    required: { error: 'Please supply the specialization' }
  }
};
