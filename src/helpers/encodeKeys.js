export const fromUint8ArrayToString = uint8Array => {
  const string = Array.from ? Array.from(uint8Array) : uint8Array.map(v => v);
  return JSON.stringify(string);
};

export const fromStringToUint8Array = text => {
  const uint8Array = JSON.parse(text);
  return new Uint8Array(uint8Array);
};
