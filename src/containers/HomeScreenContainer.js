import { connect } from 'react-redux';

import HomeScreen from './../screens/HomeScreen';

import { nameUpdate } from './../modules/application/actions';

const mapDispatchToProps = {
  nameUpdate
};

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);
