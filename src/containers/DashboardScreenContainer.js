import { connect } from 'react-redux';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import { logoutRequest } from '../modules/auth/actions';
import { getCurrentUser } from '../modules/auth/selectors';
import { gotoComparingScreen } from '../modules/comparing/actions';
import { getUsers } from '../modules/prescriptions/selectors';

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state),
    users: getUsers(state)
  };
};

const mapDispatchToProps = {
  logoutRequest,
  gotoComparingScreen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
