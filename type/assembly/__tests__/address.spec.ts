import {Address} from '../address';

describe('Doc tests', () => {
  it('should be simple to use', () => {
    const a1 = Address.fromByteString('A1aMywGBgBywiL6WcbKR4ugxoBtdP9P3waBVi5e713uvj7F1DJL');

    expect<bool>(a1.isValid()).toBeTruthy();

    // serialization / deserialization

    // byteArray
    const rawByteArray = a1.toByteArray();
    expect<number>(rawByteArray.length).toBe(51);
    expect<Address>(Address.fromByteArray(rawByteArray)).toBe(a1);

    // byteString
    const rawByteString = rawByteArray.toByteString();
    expect<number>(rawByteString.length).toBe(51);
    expect<Address>(Address.fromByteString(rawByteString)).toBe(a1);
  });
});

describe('Blackbox tests', () => {

});
