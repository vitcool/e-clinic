import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';

import { ItemsList } from '../../components/common';

class PatientsDashboard extends Component {
  componentDidMount() {
    const { fetchPrescriptionsRequest } = this.props;
    fetchPrescriptionsRequest();
  }
  handleItemPress = prescription => {
    const { selectPrescription } = this.props;
    selectPrescription({ currentPrescription: prescription });
  };
  render() {
    const { prescriptions } = this.props;
    return (
      <View>
        {prescriptions && _.keys(prescriptions).length > 0 ? (
          <ItemsList items={prescriptions} onItemPress={this.handleItemPress} titleKey="publicData"/>
        ) : (
          <Text h4>Sorry, there are no prescriptions for now:(</Text>
        )}
      </View>
    );
  }
}

PatientsDashboard.propTypes = {
  prescriptions: PropTypes.object,
  selectPrescription: PropTypes.func,
  fetchPrescriptionsRequest: PropTypes.func
};

export default PatientsDashboard;
