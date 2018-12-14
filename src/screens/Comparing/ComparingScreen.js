import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import _ from 'lodash';

import { Input, Button, Text } from '../../components/common';
import checkValidation from '../../helpers/validation';
import { comparingTextDataSchema } from '../../helpers/validationSchems';

export default class ComparingScreen extends React.Component {
  state = {
    text: '',
    validationErrors: {}
  };
  onTextChanged = (name, data) => {
    this.setState({ [name]: data });
  };
  handleEncryptTextPress = () => {
    const { encryptMessage } = this.props;
    const { text } = this.state;
    const encryptTextData = { text };
    const validation = checkValidation(
      encryptTextData,
      comparingTextDataSchema
    );
    this.setState({ validationErrors: validation.errors });
    validation.valid && encryptMessage(encryptTextData);
  };
  render() {
    const { text, validationErrors } = this.state;
    const { isComparingPerforming, elapse } = this.props;
    return (
      <View>
        <Card>
          <Text>Please, input text for encrypting</Text>
          <Input
            name="text"
            placeholder="Lorem impsum"
            label="Text for encrypting"
            value={text}
            onChangeText={inputedText =>
              this.onTextChanged('text', inputedText)
            }
            errors={validationErrors}
          />
          <Button
            onPress={this.handleEncryptTextPress}
            title={'Encrypt text'}
            loading={isComparingPerforming}
            disabled={isComparingPerforming}
          />
          {!_.isEmpty(elapse) && (
            <React.Fragment>
              <Text>Results for encrypting {elapse.size}:</Text>
              <Text> tweetNacl - {elapse.twetNacl} </Text>
              <Text> RN RSA - {elapse.rnRsa} </Text>
            </React.Fragment>
          )}
        </Card>
      </View>
    );
  }
}

ComparingScreen.propTypes = {
  isComparingPerforming: PropTypes.bool,
  encryptMessage: PropTypes.func,
  elapse: PropTypes.object
};
