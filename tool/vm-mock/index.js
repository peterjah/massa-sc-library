var m=Object();

function createMockVm(memory, createImports, instantiateSync, binary) {
    let wasm;
    const myImports = {
          massa: {
              assembly_script_has_data(k_ptr) {
                const k = wasm.__getString(k_ptr);
                return k in m;
              },
              assembly_script_get_data(k_ptr) {
                  const k = wasm.__getString(k_ptr);
                  const v_ptr = wasm.__newString(m[k]);
                  return v_ptr;
              },
              set_data(k_ptr, v_ptr) {
                  const k = wasm.__getString(k_ptr);
                  const v = wasm.__getString(v_ptr);
                  console.log("###", k,v);
                  m[k] = v;
              }
          }
        };
    let instance = instantiateSync(binary, createImports(myImports));
    wasm = instance.exports;
    
    return instance;
}

module.exports = createMockVm; 
