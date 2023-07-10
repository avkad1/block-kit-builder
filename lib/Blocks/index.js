const validators = require("./validators");
class Blocks {
  /**
   * Actions block
   * @param {Array<Object>} elements array of actions
   * @param {String} [blockId] optional block id
   * @return {{elements, type: string}}
   */
  actions({ elements, blockId }) {
    validators.actionsValidator(elements, blockId);
    const element = {
      type: "actions",
      elements,
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Context block
   * @param {String|Array<String>|Array<Object>} text text to display
   * @param {String} [blockId] optional block id
   * @return {{type: string}}
   */
  context({ text, blockId }) {
    validators.contextValidator(text, blockId);
    const element = { type: "context" };
    if (blockId) {
      element.block_id = blockId;
    }
    if (typeof text === "string") {
      element.elements = [{ type: "mrkdwn", text }];
    } else if (Array.isArray(text) && typeof text[0] === 'string') {
      element.elements = text.map((t) => ({ type: "mrkdwn", text: t }));
    } else if (Array.isArray(text) && typeof text[0] === 'object') {
      element.elements = [];
      text.forEach(({text, image}) => {
        if(image?.url) {
          element.elements.push({
            "type": "image",
            "image_url": image.url,
            "alt_text": image.alt || 'image'
          })
        }
        if(text){
          element.elements.push({
            "type": "mrkdwn",
            "text": text,
          });
        }
      });
    }
    return element;
  }

  /**
   * Divider block
   * @param {String} [blockId] optional block id
   * @return {{type: string}}
   */
  divider({ blockId } = {}) {
    validators.dividerValidator(blockId);
    const element = { type: "divider" };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Fields block
   * @param {Array<String>} fields field texts
   * @param {String} [blockId] optional block id
   * @return {{type: string, fields: *}}
   */
  fields({ fields, blockId }) {
    const element = {
      type: "section",
      fields: fields.map((f) => ({ type: "mrkdwn", text: f })),
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Header block
   * @param {String} [blockId] optional block id
   * @param {String} text header text to display
   * @return {{text: {text, type: string}, type: string}}
   */
  header({ blockId, text }) {
    validators.headerValidator(text, blockId);
    const element = {
      type: "header",
      text: { type: "plain_text", text },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }

  /**
   * Image block
   * @param {String} url valid image url
   * @param {String} [alt] optional alt text to display if image is unavailable
   * @param {String} [blockId] optional block id
   * @param {String} [title] optional title to display
   * @return {{alt_text: string, image_url, type: string}}
   */
  image({ url, alt = "image", blockId, title }) {
    validators.imageValidator({ url, alt, blockId, title });
    const element = {
      type: "image",
      image_url: url,
      alt_text: alt,
    };
    if (blockId) {
      element.block_id = blockId;
    }
    if (title) {
      element.title = {
        type: "plain_text",
        text: title,
      };
    }
    return element;
  }

  /**
   * Markdown text section block
   * @param {String} text markdown text
   * @param {String} [blockId] optional block id
   * @param {Array} [rest] optional extra fields to add to the markdown, like accessories.
   * @return {{text: {text, type: string}, type: string}}
   */
  markdown({ text, blockId, ...rest }) {
    validators.markdownValidator(text, blockId);
    let element = {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    if (rest) {
      element = { ...element, ...rest };
    }
    return element;
  }

  /**
   * Plain text section block
   * @param {String} text plain text
   * @param {String} [blockId] optional block id
   * @return {{text: {emoji: boolean, text, type: string}, type: string}}
   */
  plainText({ text, blockId }) {
    validators.markdownValidator(text, blockId);
    const element = {
      type: "section",
      text: {
        type: "plain_text",
        text,
        emoji: true,
      },
    };
    if (blockId) {
      element.block_id = blockId;
    }
    return element;
  }
}

module.exports = new Blocks();
