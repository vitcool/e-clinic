import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { Input, Button } from '../components/common';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleLoginPress = () => {
    const { emailLoginRequest } = this.props;
    const { email, password } = this.state;
    emailLoginRequest({ email, password });
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
  }

  render() {
    const { email, password } = this.state;
    const { passwordInput, signupLink } = styles;
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
          <Input
            name="password"
            placeholder="12345678"
            label="Password"
            value={password}
            onChangeText={text => this.onLoginTextChanged('password', text)}
            secureTextEntry={true}
            style={passwordInput}
          />
          <Text h4 onPress={this.handleSignupPress} style={signupLink}>
            Sign Up
          </Text>
          <Text h4 onPress={this.handleForgotPassword} style={signupLink}>
            Forgot Password
          </Text>
          <Button onPress={this.handleLoginPress} title={'Login'} />
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
  navigation: PropTypes.object
};
