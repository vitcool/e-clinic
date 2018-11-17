import { connect } from 'react-redux';

import DashboardScreen from '../screens/DashboardScreen';
import { logoutRequest } from '../modules/auth/actions';
import { getCurrentUser } from '../modules/auth/selectors';

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state)
  };
};

const mapDispatchToProps = {
  logoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
