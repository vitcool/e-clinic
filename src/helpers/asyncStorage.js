import { AsyncStorage } from 'react-native';
import { toUint8Array, fromUint8ArrayToString } from './encodeKeys';

export const saveSecretKeyToAsyncStorage = async (key, text) => {
  try {
    const string = fromUint8ArrayToString(text);
    await AsyncStorage.setItem(key, string);
  } catch (error) {
    console.log(error);
  }
};

export const getSecretKeyFromAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export const getUint8ArraySecretKeyFromAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const uint8Array = toUint8Array(value);
    return uint8Array;
  } catch (error) {
    console.log(error);
  }
};
