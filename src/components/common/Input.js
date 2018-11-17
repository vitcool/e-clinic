import React from 'react';
import { View } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Text } from './Text';

const Input = ({
  name,
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry,
  style,
  errors
}) => {
  const fieldError = errors ? errors[name] : null;
  return (
    <View style={style}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormInput
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      {fieldError ? (
        <Text style={styles.errorText}>{fieldError[0]}</Text>
      ) : null}
    </View>
  );
};

const styles = {
  errorText: {
    fontSize: 12,
    color: 'red',
    marginLeft: 20
  }
};

Input.propTypes = {
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string
};

export { Input };
