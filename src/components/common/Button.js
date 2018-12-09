import React from 'react';
import { View } from 'react-native';
import { Button as ButtonReactNativeElements } from 'react-native-elements';
import PropTypes from 'prop-types';

const Button = ({ onPress, title, loading, disabled, style }) => {
  return (
    <View>
      <ButtonReactNativeElements
        onPress={onPress}
        small
        title={title}
        backgroundColor="#0066FF"
        loading={loading}
        disabled={disabled}
        style={style}
      />
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object
};

export { Button };
