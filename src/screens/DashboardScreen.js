import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Text, Button } from '../components/common';

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
    return (
      <View>
        <Card>
          {this.renderGreetingsText()}
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
