import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';

import { Input, Button, Text } from '../components/common';
import checkValidation from '../helpers/validation';
import { forgotPasswordDataSchema } from '../helpers/validationSchems';

export default class ForgotPassword extends React.Component {
  static navigationOptions = {
    title: 'Forgot password?'
  };

  state = {
    email: '',
    validationErrors: {}
  };

  handleForgotPasswordPress = () => {
    const { forgotPasswordRequest } = this.props;
    const { email } = this.state;

    const forgotPasswordData = { email: email.toLowerCase() };
    const validation = checkValidation(
      forgotPasswordData,
      forgotPasswordDataSchema
    );

    this.setState({ validationErrors: validation.errors });

    validation.valid && forgotPasswordRequest(forgotPasswordData);
  };

  onLoginTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  render() {
    const { email, validationErrors } = this.state;
    const { isForgotPasswordRequestPending } = this.props;
    return (
      <View>
        <Card>
          <Text>Please, input your email here</Text>
          <Input
            name="email"
            placeholder="doctor@ukr.net"
            label="Email"
            value={email}
            onChangeText={text => this.onLoginTextChanged('email', text)}
            errors={validationErrors}
          />
          <Button
            onPress={this.handleForgotPasswordPress}
            title={'Reset password'}
            loading={isForgotPasswordRequestPending}
            disabled={isForgotPasswordRequestPending}
          />
        </Card>
      </View>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPasswordRequest: PropTypes.func,
  navigation: PropTypes.object,
  isForgotPasswordRequestPending: PropTypes.bool
};
