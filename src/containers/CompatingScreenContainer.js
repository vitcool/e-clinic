import { connect } from 'react-redux';

import ComparingScreen from '../screens/Comparing/ComparingScreen';
import {
  gotoComparingScreen,
  encryptMessage
} from '../modules/comparing/actions';

import {
  getElapse,
  getIsComparingPerforming
} from '../modules/comparing/selectors';

const mapStateToProps = state => {
  return {
    isComparingPerforming: getIsComparingPerforming(state),
    elapse: getElapse(state)
  };
};

const mapDispatchToProps = {
  gotoComparingScreen,
  encryptMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparingScreen);
