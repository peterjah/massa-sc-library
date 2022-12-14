let m = Object();

// TODO fill description and type of function parameters
/**
 * Create a mock vm to simulate calls and responses of Massa WebAssembly sdk.
 *
 * @param {WebAssembly.Memory} memory - ?
 * @param {?} createImports - ?
 * @param {?} instantiateSync - ?
 * @param {?} binary - ?
 *
 * @returns {?} ?
 */
function createMockVm(memory, createImports, instantiateSync, binary) {
  let wasm;
  const ConsoleImport = require('as-console/imports');
  const Console = new ConsoleImport();
  const myImports = {
    ...Console.wasmImports,
    massa: {
      // Those functions will be called from an external WebAssembly module.
      // Head objects, such as strings, can only be accessed by reading
      // heap memory starting at the given pointer (X_ptr variable).
      //
      // To read the module heap, __getString function is used.
      //
      // To return a heap object, such as strings, we push first the object to
      // the heap and then we return the pointer.
      //
      // See assembly_script_get_data, it's read and return string.
      assembly_script_has_data(k_ptr) {
        const k = wasm.__getString(k_ptr);
        console.log('has_data key=', k, k in m);
        return k in m;
      },
      assembly_script_get_data(k_ptr) {
        const k = wasm.__getString(k_ptr);
        console.log(`get_data key=${k} val=${m[k]}`);
        const v_ptr = wasm.__newString(m[k]);
        return v_ptr;
      },
      set_data(k_ptr, v_ptr) {
        const k = wasm.__getString(k_ptr);
        const v = wasm.__getString(v_ptr);
        console.log(`set_data key=${k} val=${v}`);

        m[k] = v;
      },
      set_data_for(addr, k_ptr, v_ptr) {
        const sc = wasm.__getString(addr);
        const k = wasm.__getString(k_ptr);
        const v = wasm.__getString(v_ptr);
        console.log(`set_data_for addr=${sc} key=${k} val=${v}`);
        const scStorage = m[sc];
        if (!scStorage) {
          m = {...m, [sc]: {[k]: v}};
        } else {
          const newState = {...scStorage, [k]: v};
          m[sc] = newState;
        }
      },
      assembly_script_has_data_for(addr, k_ptr) {
        const k = wasm.__getString(k_ptr);
        const sc = wasm.__getString(addr);
        console.log(`has_data_for addr=${sc} key=${k}`, !!m[sc] && k in m[sc]);
        return !!m[sc] && k in m[sc];
      },
      assembly_script_get_data_for(addr, k_ptr) {
        const k = wasm.__getString(k_ptr);
        const sc = wasm.__getString(addr);
        console.log(`get_data_for addr=${addr} key=${k} val=${m[sc][k]}`);
        const v_ptr = wasm.__newString(m[sc][k]);
        return v_ptr;
      },
      assembly_script_get_call_stack() {
        console.log(`get_call_stack`);
        return wasm.__newString('{[callee_sc_address]}');
      },
    },
  };
  let instance = instantiateSync(binary, createImports(myImports));
  Console.wasmExports = instance.exports;
  wasm = instance.exports;

  return instance;
}

module.exports = createMockVm;
