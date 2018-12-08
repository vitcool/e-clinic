import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import _ from 'lodash';

import { ItemsList, Button, Text } from '../../components/common';

class DoctorsDashboard extends Component {
  componentDidMount() {
    const { fetchUsersRequest } = this.props;
    fetchUsersRequest();
  }
  handleItemPress = user => {
    const { selectUserCreatePrescription } = this.props;
    selectUserCreatePrescription({ currentPatient: user });
  };
  handlePrescriptionsPress = () => {
    const { navigateDoctorToPrescriptionsList } = this.props;
    navigateDoctorToPrescriptionsList();
  }
  render() {
    const { users } = this.props;
    return (
      <View>
        {users && _.keys(users).length > 0 ? (
          <ItemsList
            items={users}
            onItemPress={this.handleItemPress}
            titleKey="email"
          />
        ) : (
          <Text>Sorry, there are no users for now:(</Text>
        )}
        <Button onPress={this.handlePrescriptionsPress} title="Prescriptions" />
      </View>
    );
  }
}

DoctorsDashboard.propTypes = {
  users: PropTypes.object,
  selectUserCreatePrescription: PropTypes.func,
  fetchUsersRequest: PropTypes.func,
  navigateDoctorToPrescriptionsList: PropTypes.func
};

export default DoctorsDashboard;
