import { connect } from 'react-redux';

import ForgotPasswordScreen from './../screens/ForgotPasswordScreen';

import { forgotPasswordRequest } from '../modules/auth/actions';

const mapDispatchToProps = {
  forgotPasswordRequest
};

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordScreen);
