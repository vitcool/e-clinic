import React from 'react';
import { ScrollView } from 'react-native';
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

  handleComparingPress = () => {
    const { gotoComparingScreen } = this.props;
    gotoComparingScreen();
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
    const { logoutButton } = styles;
    return (
      <ScrollView>
        <Card>
          {this.renderGreetingsText()}
          {isDoctor ? <DoctorsDashboard /> : <PatientsDashboard />}
          <Button
            onPress={this.handleLogoutPress}
            title="Log out"
            style={logoutButton}
          />
          <Button
            onPress={this.handleComparingPress}
            title="Go to comparing screen"
            style={logoutButton}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  logoutButton: { marginTop: 10 }
};

DashboardScreen.propTypes = {
  currentUser: PropTypes.object,
  logoutRequest: PropTypes.func,
  gotoComparingScreen: PropTypes.func
};
