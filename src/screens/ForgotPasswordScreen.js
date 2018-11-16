import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { Input, Button } from '../components/common';

export default class ForgotPassword extends React.Component {
  state = {
    email: ''
  };

  handleForgotPasswordPress = () => {
    const { forgotPasswordRequest } = this.props;
    const { email } = this.state;
    forgotPasswordRequest({ email });
  };

  onLoginTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  render() {
    const { email } = this.state;
    return (
      <View>
        <Card>
          <Input
            name="email"
            placeholder="doctor@ukr.net"
            label="Email"
            value={email}
            onChangeText={text => this.onLoginTextChanged('email', text)}
          />
          <Button
            onPress={this.handleForgotPasswordPress}
            title={'Reset password'}
          />
        </Card>
      </View>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPasswordRequest: PropTypes.func,
  navigation: PropTypes.object
};
