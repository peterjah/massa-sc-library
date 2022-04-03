# VM mock

`mscl-vm-mock` is a tool to unit test your smart contract simulating Massa VM using [as-pect](https://tenner-joshua.gitbook.io/as-pect/).

## Description

//TODO create a description of how the mocking works.

## Installation

After initializing your project and install `as-pect`, you need to:

- install this package
`npm install --save-dev git+ssh://git@github.com/massalabs/massa-sc-library/tool/vm-mock`

- modify `imports` function in `as-pect.config.js` to match the following:

```js
imports(memory, createImports, instantiateSync, binary) {
  const createMockVm = require('mscl-vm-mock');
  return createMockVm(memory, createImports, instantiateSync, binary);
}
```

## Usage

//TODO create a simple meaningful use case.

## Troubleshooting

//TODO create a how-to for unimplemented assembly_script_XXX
