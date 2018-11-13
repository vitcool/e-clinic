import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../containers/HomeScreenContainer';
import GreetingsScreen from '../containers/GreetingsScreenContainer';
import LoginScreen from '../containers/LoginScreenContainer';
import SignupScreenContainer from '../containers/SignupScreenContainer';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Greetings: GreetingsScreen,
    Login: LoginScreen,
    Signup: SignupScreenContainer
  },
  {
    initialRouteName: 'Login'
  }
);
