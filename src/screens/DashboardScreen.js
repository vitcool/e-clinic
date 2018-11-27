import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import nacl from 'tweetnacl';
import naclUtils from 'tweetnacl-util';

import { Text, Button } from '../components/common';

const BobKeys = nacl.box.keyPair();

const AliceKeys = nacl.box.keyPair();

export default class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard'
  };

  //from one phone
  encryptMessageFromBobToAlice = message => {
    //Bob secret key
    const bob = BobKeys;
    //get key pair form secret key => nacl.box.keyPair.fromSecretKey(BobKeys.secretKey);
    //Alice public key
    const alice = { publicKey: AliceKeys.publicKey };

    //generate one time nonce
    const nonce = nacl.randomBytes(24);
    //message to Alice
    const utf8 = message;
    //Bob encrypts message for Alice
    const box = nacl.box(
      naclUtils.decodeUTF8(utf8),
      nonce,
      alice.publicKey,
      bob.secretKey
    );
    debugger;
    //send message to Alice
    const resultMessage = { box, nonce };
    return resultMessage;
  };

  //from second phone
  decryptMessageFromBobToAlice = message => {
    // read Alice secret key
    const alice = AliceKeys;
    //const alice = nacl.box.keyPair.fromSecretKey(AliceKeys.secretKey);
    // read Bob public key
    const bob = { publicKey: BobKeys.publicKey };

    const payload = nacl.box.open(
      message.box,
      message.nonce,
      bob.publicKey,
      alice.secretKey
    );

    const utf8 = naclUtils.encodeUTF8(payload);
    return utf8;
  };

  handleLogoutPress = () => {
    const { logoutRequest } = this.props;
    logoutRequest();
  };

  renderGreetingsText = () => {
    const {
      currentUser: { isDoctor, displayName }
    } = this.props;
    return <Text>{`Hello, ${isDoctor ? 'doctor ' : ''}${displayName}`}</Text>;
  };

  renderEncryptDecryptMessage = () => {
    const messageFromBobEncrypted = this.encryptMessageFromBobToAlice(
      `{'message': 'Hello, Diploma!', 'payload': 'You are cool develper!'}`
    );
    const messageFromBobDecrypted = this.decryptMessageFromBobToAlice(
      messageFromBobEncrypted
    );
    return <Text>{messageFromBobDecrypted}</Text>;
  };

  render() {
    return (
      <View>
        <Card>
          {/* {this.renderGreetingsText()} */}
          {this.renderEncryptDecryptMessage()}
          <Button onPress={this.handleLogoutPress} title="Log out" />
        </Card>
      </View>
    );
  }
}

DashboardScreen.propTypes = {
  currentUser: PropTypes.object,
  logoutRequest: PropTypes.func
};
