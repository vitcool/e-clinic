import { connect } from 'react-redux';

import LoginScreen from './../screens/LoginScreen';

import { emailLoginRequest } from './../modules/auth/actions';

const mapDispatchToProps = {
  emailLoginRequest
};

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
