import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';

const Checkbox = ({ checked, onPress, name }) => {
  return (
    <CheckBox
      title="I am a doctor"
      checked={checked}
      name={name}
      onPress={() => onPress(name)}
      style={{ backgroundColor: 'white', borderColor: 'white' }}
    />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  name: PropTypes.string
};

export { Checkbox };
