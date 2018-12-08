import nacl from 'tweetnacl';
import naclUtils from 'tweetnacl-util';

const BobKeys = nacl.box.keyPair();

const AliceKeys = nacl.box.keyPair();

export const generateKeyPair = () => nacl.box.keyPair();

export const encryptMessage = (
  senderSecretKey,
  recipientPublicKey,
  message
) => {
  const nonce = nacl.randomBytes(24);
  const box = nacl.box(
    naclUtils.decodeUTF8(message),
    nonce,
    recipientPublicKey,
    senderSecretKey
  );
  const result = { box, nonce };
  return result;
};

//from one phone
export const encryptMessageFromBobToAlice = message => {
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
  //debugger;
  //send message to Alice
  const resultMessage = { box, nonce };
  return resultMessage;
};

export const decryptMessage = (senderPublicKey, recipientSecretKey, message) => {
  const result = nacl.box.open(
    message.box,
    message.nonce,
    senderPublicKey,
    recipientSecretKey
  );
  const string = naclUtils.encodeUTF8(result);
  return string;
};

//from second phone
export const decryptMessageFromBobToAlice = message => {
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
