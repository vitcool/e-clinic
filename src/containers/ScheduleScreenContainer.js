import { connect } from 'react-redux';

import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import { getPrescriptionList } from '../modules/prescriptionsList/selectors';

const mapStateToProps = state => {
  return {
    prescriptionsList: getPrescriptionList(state)
  };
};

export default connect(mapStateToProps)(ScheduleScreen);
