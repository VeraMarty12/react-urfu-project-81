class Tag {
  private name: string;
  private attributes: Record<string, string | number | boolean>;
  private content: string;

  private static readonly singleTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  constructor(
    name: string,
    attributes: Record<string, string | number | boolean> = {},
    content: string = ''
  ) {
    this.name = name;
    this.attributes = attributes;
    this.content = content;
  }

  toString(): string {
    const attrsArray = Object.entries(this.attributes)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : null;
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean);

    const attrsString = attrsArray.length > 0 ? ` ${attrsArray.join(' ')}` : '';

    if (Tag.singleTags.has(this.name)) {
      return `<${this.name}${attrsString}>`;
    }

    return `<${this.name}${attrsString}>${this.content}</${this.name}>`;
  }
}

export default Tag;