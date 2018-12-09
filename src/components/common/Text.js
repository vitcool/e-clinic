import React from 'react';
import {
  Text as TextReactNativeElements,
  FormLabel
} from 'react-native-elements';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Text = ({ children, style, label, textStyle }) => {
  return (
    <View style={style}>
      {label && <FormLabel>{label}</FormLabel>}
      <TextReactNativeElements style={textStyle}>
        {children}
      </TextReactNativeElements>
    </View>
  );
};

Text.propTypes = {
  children: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  label: PropTypes.string
};

export { Text };
