import { connect } from 'react-redux';

import ForgotPasswordScreen from './../screens/ForgotPasswordScreen';
import { forgotPasswordRequest } from '../modules/auth/actions';
import { getIsForgotPasswordRequestPending } from '../modules/auth/selectors';

const mapStateToProps = state => {
  return {
    isForgotPasswordRequestPending: getIsForgotPasswordRequestPending(state)
  };
};

const mapDispatchToProps = {
  forgotPasswordRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
