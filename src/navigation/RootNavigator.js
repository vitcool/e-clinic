import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../containers/LoginScreenContainer';
import SignupScreenContainer from '../containers/SignupScreenContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';

import DashboardScreenContainer from '../containers/DashboardScreenContainer';
import PrescriptionScreenContainer from '../containers/PrescriptionScreenContainer';
import PatientsDashboardContainer from '../containers/PatientsDashboardContainer';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreenContainer,
    ForgotPassword: ForgotPasswordContainer,
    Dashboard: DashboardScreenContainer,
    Prescription: PrescriptionScreenContainer,
    PatientsDashboard: PatientsDashboardContainer
  },
  {
    initialRouteName: 'Login'
  }
);
