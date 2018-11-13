import { connect } from 'react-redux';

import SignupScreen from '../screens/SignupScreen';

import { signupRequest } from '../modules/auth/actions';

const mapDispatchToProps = {
  signupRequest
};

export default connect(
  null,
  mapDispatchToProps
)(SignupScreen);
