import {Valider} from './valider';
import {ByteArray} from './byteArray';

/**
 * A Massa's blockchain address.
 *
 */
export class Address implements Valider {
  _value: string;

  /**
   * Creates a new Address;
   *
   * @param {string} bs - Byte string.
   */
  constructor(
      bs: string ) {
    this._value = bs;
  }
  /**
   * Returns if the Address is still valid.
   * @return {bool}
   */
  isValid(): bool {
    return this._value.startsWith('A');
  }

  /**
   * Returns an Address from a byte string.
   *
   * @param {string} bs - Byte string
   *
   * @return {Address}
   */
  static fromByteString(bs: string): Address {
    return new Address(bs);
  }

  /**
   * Serialize to byte string.
   *
   * @return {string}
   */
  toByteString(): string {
    return this._value;
  }

  /**
   * Returns an Address from a byte array.
   *
   * @param {string} a - Byte array
   *
   * @return {Address}
   */
  static fromByteArray(a: Uint8Array): Address {
    return this.fromByteString(ByteArray.fromUint8Array(a).toByteString());
  }

  /**
   * Serialize to ByteArray.
   * @return {ByteArray}
   */
  toByteArray(): ByteArray {
    return ByteArray.fromByteString(this._value);
  }

  /**
   * Tests if two adresses are identical.
   *
   * @param {Address} other
   * @return {boolean}
   */
  @operator('==')
  equals(other: Address): boolean {
    return this._value == other.toByteString();
  }

  /**
   * Tests if two addresses are different.
   *
   * @param {Address} other
   * @return {boolean}
   */
  @operator('!=')
  notEqual(other: Address): boolean {
    return !(this == other);
  }
}
