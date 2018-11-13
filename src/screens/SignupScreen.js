import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { Input, Button, Checkbox } from '../components/common';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isDoctor: false
  };

  handleSignupPress = () => {
    const { signupRequest } = this.props;
    const { email, password } = this.state;
    signupRequest({ email, password });
  };

  onSignupTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  onSignupCheckboxChanged = name => {
    const currentValue = this.state[name];
    this.setState({ [name]: !currentValue });
  };

  render() {
    const { email, password, isDoctor } = this.state;
    return (
      <View>
        <Card>
          <Input
            name="email"
            placeholder="doctor@ukr.net"
            label="Email"
            value={email}
            onChangeText={text => this.onSignupTextChanged('email', text)}
          />
          <Input
            name="password"
            placeholder="12345678"
            label="Password"
            value={password}
            onChangeText={text => this.onSignupTextChanged('password', text)}
            secureTextEntry={true}
            style={{ marginBottom: 10 }}
          />
          <Checkbox
            title="I am a doctor"
            checked={isDoctor}
            name='isDoctor'
            onPress={this.onSignupCheckboxChanged}
          />
          <Button onPress={this.handleSignupPress} title={'Sign Up'} />
        </Card>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  signupRequest: PropTypes.func
};
