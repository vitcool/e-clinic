import React from 'react';
import { View } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';

const Input = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry,
  style
}) => {
  return (
    <View style={style}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormInput
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
};

Input.propTypes = {
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object
};

export { Input };
