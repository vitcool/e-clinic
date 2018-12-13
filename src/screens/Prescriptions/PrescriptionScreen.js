import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Input, Button, Text, Table } from '../../components/common';
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
    pillsSchedule: [{ title: '', doze: '', interval: '', id: 0 }],
    validationErrors: {}
  };

  handleAddPrescriptionButtonClick = () => {
    const { createPrescriptionRequest } = this.props;
    const { secretData, publicData, pillsSchedule } = this.state;
    const prescriptionData = { secretData, publicData };
    const validation = checkValidation(
      prescriptionData,
      prescriptionDataSchema
    );
    this.setState({ validationErrors: validation.errors });
    const pillsScheduleData = JSON.stringify(
      _.filter(pillsSchedule, item => _.isEmpty(item.title))
    );
    validation.valid &&
      createPrescriptionRequest({ secretData, publicData, pillsScheduleData });
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

  onAddPillSchedulePress = () => {
    const { pillsSchedule } = this.state;
    const newPillsSchedule = [
      ...pillsSchedule,
      { title: '', doze: '', interval: '', id: pillsSchedule.length }
    ];
    this.setState({ pillsSchedule: newPillsSchedule });
  };

  onPillScheduleItemChange = (text, item, index) => {
    const newPillsSchedule = [...this.state.pillsSchedule];
    newPillsSchedule[index][item] = text;
    this.setState({ pillsSchedule: newPillsSchedule });
  };

  render() {
    const {
      currentUser: { isDoctor },
      currentPrescription = null
    } = this.props;
    const {
      publicData,
      secretData,
      comment,
      validationErrors,
      pillsSchedule
    } = this.state;
    const {
      prescriptionTextStyle,
      buttonStyle,
      tableComponentStyle,
      tableStyle
    } = styles;
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
              <Table
                label="Pills"
                allowEdit={true}
                data={pillsSchedule}
                style={tableComponentStyle}
                onAddPillPress={this.onAddPillSchedulePress}
                onItemChange={this.onPillScheduleItemChange}
              />
              {currentPrescription && currentPrescription.comment && (
                <Text>{currentPrescription.comment}</Text>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text label="Public Data" textStyle={prescriptionTextStyle}>
                {currentPrescription.publicData}
              </Text>
              <Text label="Private Data" textStyle={prescriptionTextStyle}>
                {currentPrescription.secretData}
              </Text>
              <Table
                label="Pills"
                data={JSON.parse(currentPrescription.pillsSchedule)}
                allowEdit={false}
                style={tableComponentStyle}
                tableStyle={tableStyle}
              />
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
            style={buttonStyle}
          />
        </Card>
      </View>
    );
  }
}

const styles = {
  prescriptionTextStyle: {
    marginLeft: 20
  },
  buttonStyle: {
    marginTop: 10
  },
  tableComponentStyle: {
    marginTop: 10
  },
  tableStyle: {
    marginLeft: 20
  }
};

PrescriptionScreen.propTypes = {
  createPrescriptionRequest: PropTypes.func,
  currentUser: PropTypes.object,
  currentPrescription: PropTypes.object,
  uploadPrescriptionCommentRequest: PropTypes.func
};
