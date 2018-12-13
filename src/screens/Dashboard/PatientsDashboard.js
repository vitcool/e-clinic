import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';

import { ItemsList, Button } from '../../components/common';

class PatientsDashboard extends Component {
  componentDidMount() {
    const { fetchPrescriptionsRequest } = this.props;
    fetchPrescriptionsRequest();
  }
  handleItemPress = prescription => {
    const { selectPrescription } = this.props;
    selectPrescription({ currentPrescription: prescription });
  };
  handlePrescriptionPress = () => {
    const { createPrescriptionsList } = this.props;
    createPrescriptionsList();
  };
  render() {
    const { prescriptions } = this.props;
    const { prescriptionListButton } = styles;
    return (
      <View>
        {prescriptions && _.keys(prescriptions).length > 0 ? (
          <React.Fragment>
            <ItemsList
              items={prescriptions}
              onItemPress={this.handleItemPress}
              titleKey="publicData"
            />
            <Button
              style={prescriptionListButton}
              title="Create Prescription List"
              onPress={this.handlePrescriptionPress}
            />
          </React.Fragment>
        ) : (
          <Text h4>Sorry, there are no prescriptions for now:(</Text>
        )}
      </View>
    );
  }
}

const styles = {
  prescriptionListButton: {
    marginTop: 10
  }
};

PatientsDashboard.propTypes = {
  prescriptions: PropTypes.object,
  selectPrescription: PropTypes.func,
  fetchPrescriptionsRequest: PropTypes.func,
  createPrescriptionsList: PropTypes.func
};

export default PatientsDashboard;
