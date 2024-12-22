# @avkad1/block-kit-builder

## Getting started

This is a simple package that can be used to create the blocks and views required to interact with users on any Slack surface. This is based on Slack's own [Block Kit Builder](https://app.slack.com/block-kit-builder/).

### Installation

```console
 npm install --save @avkad1/block-kit-builder
```

---
### Usage

```javascript
const BlockKitBuilder = require("@avkad1/block-kit-builder");

const blocks = BlockKitBuilder.Blocks.markdown({
  text: "Hello world!",
  blockId: "hello_block",
  ...BlockKitBuilder.Accessory.button({
    text: "Click me!",
    style: "primary",
    actionId: "click",
    value: "something",
  }),
});

// OR

const { Blocks, Accessory } = require("@avkad1/block-kit-builder");
const blocks = Blocks.markdown({
  text: "Hello world!",
  blockId: "hello_block",
  ...Accessory.button({
    text: "Click me!",
    style: "primary",
    actionId: "click",
    value: "something",
  }),
});
```
---
### License
@avkad1/block-kit-builder is licensed under the [MIT License](https://github.com/iamkun/dayjs/blob/HEAD/LICENSE).
