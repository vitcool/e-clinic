import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../containers/HomeScreenContainer';
import GreetingsScreen from '../containers/GreetingsScreenContainer';
import LoginScreen from '../containers/LoginScreenContainer';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Greetings: GreetingsScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login'
  }
);
