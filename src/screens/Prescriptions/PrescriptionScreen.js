import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Input, Button, Text } from '../../components/common';
import checkValidation from '../../helpers/validation';
import {
  prescriptionDataSchema,
  commentPrescriptionDataSchema
} from '../../helpers/validationSchems';

export default class PrescriptionScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription'
  };

  state = {
    secretData: '',
    publicData: '',
    comment: '',
    validationErrors: {}
  };

  handleAddPrescriptionButtonClick = () => {
    const { createPrescriptionRequest } = this.props;
    const { secretData, publicData } = this.state;
    const prescriptionData = { secretData, publicData };
    const validation = checkValidation(
      prescriptionData,
      prescriptionDataSchema
    );

    this.setState({ validationErrors: validation.errors });

    validation.valid && createPrescriptionRequest({ secretData, publicData });
  };

  handleAddCommentButtonClick = () => {
    const { uploadPrescriptionCommentRequest } = this.props;
    const { comment } = this.state;
    const commentPescriptionData = { comment };
    const validation = checkValidation(
      commentPescriptionData,
      commentPrescriptionDataSchema
    );

    this.setState({ validationErrors: validation.errors });

    validation.valid && uploadPrescriptionCommentRequest({ comment });
  };

  handleTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  render() {
    const {
      currentUser: { isDoctor },
      currentPrescription
    } = this.props;
    const { publicData, secretData, comment, validationErrors } = this.state;
    return (
      <View>
        <Card>
          {isDoctor ? (
            <React.Fragment>
              <Input
                name="publicData"
                placeholder="Public Data"
                label="Public Data"
                value={publicData}
                onChangeText={text =>
                  this.handleTextChanged('publicData', text)
                }
                errors={validationErrors}
              />
              <Input
                name="secretData"
                placeholder="12345678"
                label="Secret Data"
                value={secretData}
                onChangeText={text =>
                  this.handleTextChanged('secretData', text)
                }
                style={secretData}
                errors={validationErrors}
              />
              {currentPrescription.comment && (
                <Text>{currentPrescription.comment}</Text>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text>{currentPrescription.publicData}</Text>
              <Text>{currentPrescription.secretData}</Text>
              <Input
                name="comment"
                placeholder="12345678"
                label="Comment"
                value={comment}
                onChangeText={text => this.handleTextChanged('comment', text)}
                errors={validationErrors}
              />
            </React.Fragment>
          )}

          <Button
            onPress={
              isDoctor
                ? this.handleAddPrescriptionButtonClick
                : this.handleAddCommentButtonClick
            }
            title={`${isDoctor ? 'Add prescrition' : 'Add comment'}`}
          />
        </Card>
      </View>
    );
  }
}

PrescriptionScreen.propTypes = {
  createPrescriptionRequest: PropTypes.func,
  currentUser: PropTypes.object,
  currentPrescription: PropTypes.object,
  uploadPrescriptionCommentRequest: PropTypes.func
};
