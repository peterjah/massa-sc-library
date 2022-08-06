/**
 * Set data in mocked storage
 *
 * Set the given value for the given key in mocked vm storage.
 *
 * @param {string} k - Key to set the data to.
 * @param {string} v - Value to set in storage.
 *
 * @returns {void}
 */
// @ts-ignore: decorator
@external("massa", "set_data")
export declare function setData(k:string, v:string):void;

/**
 * Set data in mocked storage
 *
 * Set the given value for the given key in mocked vm storage.
 *
 * @param {string} addr - sc storage addr.
 * @param {string} k - Key to set the data to.
 * @param {string} v - Value to set in storage.
 *
 * @returns {void}
 */
// @ts-ignore: decorator
@external("massa", "set_data_for")
export declare function setDataOf(addr: string, k:string, v:string):void;
