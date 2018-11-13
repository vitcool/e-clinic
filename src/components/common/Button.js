import React from 'react';
import { View } from 'react-native';
import { Button as ButtonReactNativeElements } from 'react-native-elements';
import PropTypes from 'prop-types';

const Button = ({ onPress, title }) => {
  return (
    <View>
      <ButtonReactNativeElements onPress={onPress} small title={title} backgroundColor="#0066FF" />
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
};

export { Button };
