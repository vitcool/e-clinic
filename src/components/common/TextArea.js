import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { FormLabel } from 'react-native-elements';

const TextArea = ({ label, numberOfLines, value, onChangeText }) => {
  return (
    <View>
      {label && <FormLabel>{label}</FormLabel>}
      <TextInput
        multiline={true}
        numberOfLines={numberOfLines}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  numberOfLines: PropTypes.number,
  value: PropTypes.string,
  onChangeText: PropTypes.string
};

export default TextArea;
