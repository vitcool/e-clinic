import React from 'react';
import { Text as TextReactNativeElements } from 'react-native-elements';
import PropTypes from 'prop-types';

const Text = ({ children, style }) => {
  return (
    <TextReactNativeElements style={style}>{children}</TextReactNativeElements>
  );
};

Text.propTypes = {
  children: PropTypes.string,
  style: PropTypes.object
};

export { Text };
