import Tag from './Tag';

class FormBuilder {
  private template: Record<string, unknown>;
  private tags: Tag[] = [];

  constructor(template: Record<string, unknown>) {
    this.template = template;
  }

  input(name: string, options: { as?: string; [key: string]: unknown } = {}) {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const value = this.template[name];
    
    const { as, ...attributes } = options;

    if (as === 'textarea') {
      const textareaAttrs = {
        cols: 20,
        rows: 40,
        name,
        ...attributes,
      };
      this.tags.push(new Tag('textarea', textareaAttrs, String(value)));
    } else {
      const inputAttrs = {
        name,
        type: 'text',
        value: String(value),
        ...attributes,
      };
      this.tags.push(new Tag('input', inputAttrs));
    }
  }

  toString(): string {
    return this.tags.map((tag) => tag.toString()).join('');
  }
}

export default FormBuilder;