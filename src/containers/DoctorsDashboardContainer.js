import { connect } from 'react-redux';

import DoctorsDashboard from '../screens/Dashboard/DoctorsDashboard';
import { fetchUsersRequest } from '../modules/prescriptions/actions';
import { getUsers } from '../modules/prescriptions/selectors';
import { selectUserCreatePrescription, navigateDoctorToPrescriptionsList } from './../modules/prescriptions/actions';

const mapStateToProps = state => {
  return {
    users: getUsers(state)
  };
};

const mapDispatchToProps = {
  selectUserCreatePrescription,
  fetchUsersRequest,
  navigateDoctorToPrescriptionsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorsDashboard);
