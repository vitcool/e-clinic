import React from 'react';
import { View } from 'react-native';
import { Button as ButtonNativeBase, Text } from 'native-base';
import PropTypes from 'prop-types';

const Button = ({ onPress, children, label }) => {
  return (
    <View>
      {label ? <Text>{label}</Text> : null}
      <ButtonNativeBase onPress={onPress} block>
        <Text>{children}</Text>
      </ButtonNativeBase>
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.object,
  label: PropTypes.string
};

export { Button };
