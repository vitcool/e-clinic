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

export const prescriptionDataSchema = {
  secretData: {
    required: { error: 'Please supply the secret data' }
  },
  publicData: {
    required: { error: 'Please supply the public data' }
  }
};

export const commentPrescriptionDataSchema = {
  comment: {
    required: { error: 'Please supply the comment' }
  }
}

export const comparingTextDataSchema = {
  text: {
    required: { error: 'Please supply the text for encrypting' }
  }
}
