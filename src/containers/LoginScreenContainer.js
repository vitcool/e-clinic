import { connect } from 'react-redux';

import LoginScreen from '../screens/Auth/LoginScreen';
import { emailLoginRequest } from './../modules/auth/actions';
import { getIsLoginRequestPending } from '../modules/auth/selectors';

const mapStateToProps = state => {
  return {
    isLoginRequestPending: getIsLoginRequestPending(state)
  };
};

const mapDispatchToProps = {
  emailLoginRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
