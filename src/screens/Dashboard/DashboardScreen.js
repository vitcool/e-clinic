import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Text, Button } from '../../components/common';
import DoctorsDashboard from '../../containers/DoctorsDashboardContainer';
import PatientsDashboard from '../../containers/PatientsDashboardContainer';
export default class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard'
  };

  handleLogoutPress = () => {
    const { logoutRequest } = this.props;
    logoutRequest();
  };

  renderGreetingsText = () => {
    const {
      currentUser: { isDoctor, displayName }
    } = this.props;
    return <Text>{`Hello, ${isDoctor ? 'doctor ' : ''}${displayName}`}</Text>;
  };

  render() {
    const {
      currentUser: { isDoctor }
    } = this.props;
    return (
      <View>
        <Card>
          {this.renderGreetingsText()}
          {isDoctor ? <DoctorsDashboard /> : <PatientsDashboard />}
          <Button onPress={this.handleLogoutPress} title="Log out" />
        </Card>
      </View>
    );
  }
}

DashboardScreen.propTypes = {
  currentUser: PropTypes.object,
  logoutRequest: PropTypes.func
};
