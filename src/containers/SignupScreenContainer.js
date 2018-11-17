import { connect } from 'react-redux';

import SignupScreen from '../screens/SignupScreen';
import { signupRequest } from '../modules/auth/actions';
import { getIsSignupRequestPending } from '../modules/auth/selectors';

const mapStateToProps = state => {
  return {
    isSignupRequestPending: getIsSignupRequestPending(state)
  };
};

const mapDispatchToProps = {
  signupRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
