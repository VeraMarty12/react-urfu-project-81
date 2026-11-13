import Tag from './Tag';

class HexletCode {
  static formFor(
    template: Record<string, unknown>,
    options: { url?: string; method?: string } = {},
    callback: (f: unknown) => void
  ): string {
    const action = options.url || '#';
    const method = options.method || 'post';

    callback({});

    const formTag = new Tag('form', { action, method }, '');
    
    return formTag.toString();
  }
}

export default HexletCode;