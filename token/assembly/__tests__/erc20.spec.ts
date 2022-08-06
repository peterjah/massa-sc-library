import * as token from '../std/impl';
// TODO change relative path to cleaner import
import { setDataOf } from '../../../tool/vm-mock/assembly/storage';
import {console} from 'as-console';
import {Context} from 'massa-sc-std';

describe('Black box tests', () => {
  it('should expose token name', () => {
    expect<string>(token.name('')).toBe('Standard token implementation');
  });

  it('should return 0 for initialized balance', () => {
    expect<string>(token.balanceOf('XXXaddress-1XXX')).toBe('0', 'default balance not working');
  });

  it('should return initialized balance', () => {
    const tokenAddr = Context.callee();
    setDataOf(tokenAddr.toByteString(), 'balXXXaddress-1XXX', '1000');
    console.log(token.balanceOf('balXXXaddress-1XXX'));
    expect<string>(token.balanceOf('balXXXaddress-1XXX')).toBe(
      '1000',
      'initialized balance not working'
    );
  });
});
