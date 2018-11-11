import { connect } from 'react-redux';

import GreetingsScreen from './../screens/GreetingsScreen';

import { getName } from '../modules/application/selectors';

const mapStateToProps = state => {
  return {
    name: getName(state)
  };
};

export default connect(mapStateToProps)(GreetingsScreen);
