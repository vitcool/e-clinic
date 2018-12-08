import { connect } from 'react-redux';

import PrescriptionsScreen from '../screens/Prescriptions/PrescriptionScreen';
import { createPrescriptionRequest, uploadPrescriptionCommentRequest } from './../modules/prescriptions/actions';
import { getCurrentUser } from '../modules/auth/selectors';
import {getCurrentPrescription} from '../modules/prescriptions/selectors';


const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state),
    currentPrescription: getCurrentPrescription(state)
  };
};

    

const mapDispatchToProps = {
  createPrescriptionRequest,
  uploadPrescriptionCommentRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionsScreen);
