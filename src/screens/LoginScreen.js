import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { Input, Button } from '../components/common';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: ''
  };

  goToGreetingsPage = () => {
    const { emailLoginRequest } = this.props;
    const { email, password } = this.state;
    emailLoginRequest({ email, password });
  };

  onLoginTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  render() {
    const { email, password } = this.state;
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
            style={{ marginBottom: 10 }}
          />
          <Button onPress={this.goToGreetingsPage} title={'Login'} />
        </Card>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  emailLoginRequest: PropTypes.func
};
