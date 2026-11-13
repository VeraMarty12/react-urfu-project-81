import Tag from './Tag';
import FormBuilder from './FormBuilder';
import { renderField } from './render';

class HexletCode {
  static formFor(
    template: Record<string, unknown>,
    options: { url?: string; method?: string } = {},
    callback: (f: FormBuilder) => void
  ): string {
    const action = options.url || '#';
    const method = options.method || 'post';

    const builder = new FormBuilder(template);
    callback(builder);

    const content = builder.fields.map(renderField).join('');

    const formTag = new Tag('form', { action, method }, content);
    return formTag.toString();
  }
}

export default HexletCode;