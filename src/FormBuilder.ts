import { FormField } from './types';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

class FormBuilder {
  private template: Record<string, unknown>;
  public fields: FormField[] = [];

  constructor(template: Record<string, unknown>) {
    this.template = template;
  }

    input(name: string, options: { as?: string; label?: string; labelHtml?: Record<string, string>; [key: string]: unknown } = {}) {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }
    const { as, label, labelHtml, ...attributes } = options;
    
    this.fields.push({
      name,
      type: as === 'textarea' ? 'textarea' : 'input',
      value: String(this.template[name]),
      label: label || capitalize(name), 
      labelHtml: labelHtml,       
      attributes: attributes as Record<string, string | number | boolean>,
    });
  }

  submit(text: string = 'Save') {
    this.fields.push({
      type: 'submit',
      name: 'submit',
      value: text,
    });
  }
}

export default FormBuilder;