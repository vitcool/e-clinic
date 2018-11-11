import React from 'react';
import { Text as TextNativeBase } from 'native-base';
import PropTypes from 'prop-types';

const Text = ({ children }) => {
  return <TextNativeBase>{children}</TextNativeBase>;
};

Text.propTypes = {
  children: PropTypes.string
};

export { Text };
