import React from 'react';
import { Input as InputNativeBase, Item, Label } from 'native-base';
import PropTypes from 'prop-types';

const Input = ({ value, onChangeText, label }) => {
  return (
    <Item floatingLabel>
      {label && <Label>{label}</Label>}
      <InputNativeBase onChangeText={onChangeText} value={value} />
    </Item>
  );
};

Input.propTypes = {
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string
};

export { Input };
