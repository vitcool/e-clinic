import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';

import { Input, Button, Checkbox } from '../components/common';
import checkValidation from '../helpers/validation';
import { signupDataSchema } from '../helpers/validationSchems';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up'
  };

  state = {
    email: '',
    password: '',
    name: '',
    surname: '',
    specialization: '',
    isDoctor: false,
    validationErrors: {}
  };

  handleSignupPress = () => {
    const { signupRequest } = this.props;
    const {
      email,
      password,
      name,
      surname,
      specialization,
      isDoctor
    } = this.state;
    const signupData = {
      email: email.toLowerCase(),
      password,
      name,
      surname,
      specialization: isDoctor ? specialization : 'notSupplied',
      isDoctor
    };

    const validation = checkValidation(signupData, signupDataSchema);

    this.setState({ validationErrors: validation.errors });

    validation.valid && signupRequest(signupData);
  };

  onSignupTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };

  onSignupCheckboxChanged = name => {
    const currentValue = this.state[name];
    this.setState({ [name]: !currentValue });
  };

  render() {
    const { isSignupRequestPending } = this.props;
    const {
      email,
      password,
      name,
      surname,
      specialization,
      isDoctor,
      validationErrors
    } = this.state;
    return (
      <View /*style={{ flex: 1, justifyContent: 'center' }}*/>
        <Card>
          <Input
            name="email"
            placeholder="doctor@ukr.net"
            label="Email"
            value={email}
            onChangeText={text => this.onSignupTextChanged('email', text)}
            errors={validationErrors}
          />
          <Input
            name="password"
            placeholder="12345678"
            label="Password"
            value={password}
            onChangeText={text => this.onSignupTextChanged('password', text)}
            secureTextEntry={true}
            errors={validationErrors}
          />
          <Input
            name="name"
            placeholder="John"
            label="Name"
            value={name}
            onChangeText={text => this.onSignupTextChanged('name', text)}
            errors={validationErrors}
          />
          <Input
            name="surname"
            placeholder="Deer"
            label="Surname"
            value={surname}
            onChangeText={text => this.onSignupTextChanged('surname', text)}
            style={{ marginBottom: 10 }}
            errors={validationErrors}
          />
          {isDoctor && (
            <Input
              name="specialization"
              placeholder="Dantist"
              label="Specialization"
              value={specialization}
              onChangeText={text =>
                this.onSignupTextChanged('specialization', text)
              }
              errors={validationErrors}
            />
          )}
          <Checkbox
            title="I am a doctor"
            checked={isDoctor}
            name="isDoctor"
            onPress={this.onSignupCheckboxChanged}
          />
          <Button
            onPress={this.handleSignupPress}
            title={'Sign Up'}
            loading={isSignupRequestPending}
            disabled={isSignupRequestPending}
          />
        </Card>
      </View>
    );
  }
}

SignupScreen.propTypes = {
  signupRequest: PropTypes.func,
  isSignupRequestPending: PropTypes.bool
};
