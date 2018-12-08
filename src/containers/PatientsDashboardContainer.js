import { connect } from 'react-redux';

import PatiensDashboard from '../screens/Dashboard/PatientsDashboard';
import { fetchPrescriptionsRequest } from '../modules/prescriptions/actions';
import { getPrescriptions } from '../modules/prescriptions/selectors';
import { selectPrescription } from '../modules/prescriptions/actions';

const mapStateToProps = state => {
  return {
    prescriptions: getPrescriptions(state)
  };
};

const mapDispatchToProps = {
  selectPrescription,
  fetchPrescriptionsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatiensDashboard);
