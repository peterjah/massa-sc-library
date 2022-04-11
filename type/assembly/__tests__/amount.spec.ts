import {Currency} from '../currency';
import {Amount} from '../amount';

describe('Doc tests', () => {
  it('should be simple to use', () => {
    const c1 = new Currency('Testing', 2);
    const a1 = new Amount(500, c1);

    const a2 = a1.add(new Amount(100, c1));

    expect<u64>(a2.value()).toBe(600);
    expect<bool>(a1.lessThan(a2)).toBeTruthy();

    // Amount a1 is lower than amout a2
    // Substraction is therefore negative which is forbidden.
    // Therefore new amount is not valid anymore.
    expect<bool>(a1.substract(a2).isValid()).toBeFalsy();
  });
});

describe('Blackbox tests', () => {
  test('checker/getter', () => {
    const a = new Amount(100, new Currency());
    expect<u64>(a.value()).toBe(100, 'value method');
    expect<bool>(a.isValid()).toBeTruthy('isValid method');
    expect<bool>(a.currency().sameAs(new Currency()))
        .toBeTruthy('currency method');
  });
  test('under/overflow', () => {
    const a = new Amount(u64.MAX_VALUE);
    expect<bool>(a.add(new Amount(1)).isValid()).toBeFalsy('overflow');
    expect<bool>(a.add(new Amount(0)).isValid()).toBeTruthy('MAX_VALUE + 0');
    expect<bool>((new Amount()).substract(a).isValid()).toBeFalsy('underflow');
  });
});