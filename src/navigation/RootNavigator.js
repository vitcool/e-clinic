import { createStackNavigator } from 'react-navigation';

import DashboardScreen from '../containers/DashboardScreenContainer';
import LoginScreen from '../containers/LoginScreenContainer';
import SignupScreenContainer from '../containers/SignupScreenContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreenContainer,
    ForgotPassword: ForgotPasswordContainer,
    Dashboard: DashboardScreen
  },
  {
    initialRouteName: 'Dashboard'
  }
);
