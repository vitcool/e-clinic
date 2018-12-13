import { connect } from 'react-redux';

import PatiensDashboard from '../screens/Dashboard/PatientsDashboard';
import { fetchPrescriptionsRequest } from '../modules/prescriptions/actions';
import { getPrescriptions } from '../modules/prescriptions/selectors';
import { selectPrescription } from '../modules/prescriptions/actions';
import { createPrescriptionsList } from '../modules/prescriptionsList/actions';

const mapStateToProps = state => {
  return {
    prescriptions: getPrescriptions(state)
  };
};

const mapDispatchToProps = {
  selectPrescription,
  fetchPrescriptionsRequest,
  createPrescriptionsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatiensDashboard);
