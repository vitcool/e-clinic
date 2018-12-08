import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';

import { Input, Button } from '../../components/common';
import checkValidation from '../../helpers/validation';
import { loginDataSchema } from '../../helpers/validationSchems';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  state = {
    email: '',
    password: '',
    validationErrors: {}
  };

  handleLoginPress = () => {
    const { emailLoginRequest } = this.props;
    const { email, password } = this.state;
    const emailLoginData = { email, password };
    const validation = checkValidation(emailLoginData, loginDataSchema);

    this.setState({ validationErrors: validation.errors });

    validation.valid && emailLoginRequest(emailLoginData);
  };

  onLoginTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  handleSignupPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  };

  handleForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ForgotPassword');
  };

  render() {
    const { isLoginRequestPending } = this.props;
    const { email, password, validationErrors } = this.state;
    const { passwordInput, signupLink } = styles;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Input
            name="email"
            placeholder="doctor@ukr.net"
            label="Email"
            value={email}
            onChangeText={text => this.onLoginTextChanged('email', text)}
            errors={validationErrors}
          />
          <Input
            name="password"
            placeholder="12345678"
            label="Password"
            value={password}
            onChangeText={text => this.onLoginTextChanged('password', text)}
            secureTextEntry={true}
            style={passwordInput}
            errors={validationErrors}
          />
          <Text h4 onPress={this.handleSignupPress} style={signupLink}>
            Sign Up
          </Text>
          <Text h4 onPress={this.handleForgotPassword} style={signupLink}>
            Forgot Password
          </Text>
          <Button
            onPress={this.handleLoginPress}
            title={'Login'}
            loading={isLoginRequestPending}
            disabled={isLoginRequestPending}
          />
        </Card>
      </View>
    );
  }
}

const styles = {
  passwordInput: { marginBottom: 10 },
  signupLink: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline'
  }
};

LoginScreen.propTypes = {
  emailLoginRequest: PropTypes.func,
  navigation: PropTypes.object,
  isLoginRequestPending: PropTypes.bool
};
