import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../containers/HomeScreenContainer';
import GreetingsScreen from '../containers/GreetingsScreenContainer';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Greetings: GreetingsScreen
  },
  {
    initialRouteName: 'Home'
  }
);
