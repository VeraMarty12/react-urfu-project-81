import { describe, it, expect } from 'vitest';
import Tag from './index';

describe('Tag', () => {
  it('should render single tag', () => {
    const tag = new Tag('br');
    expect(tag.toString()).toBe('<br>');
  });

  it('should render single tag with attributes', () => {
    const tag = new Tag('img', { src: 'path/to/image' });
    expect(tag.toString()).toBe('<img src="path/to/image">');
  });

  it('should render paired tag without attributes', () => {
    const tag = new Tag('label', {}, 'Email');
    expect(tag.toString()).toBe('<label>Email</label>');
  });

  it('should render paired tag with attributes', () => {
    const tag = new Tag('label', { for: 'email' }, 'Email');
    expect(tag.toString()).toBe('<label for="email">Email</label>');
  });

  it('should render empty paired tag', () => {
    const tag = new Tag('div');
    expect(tag.toString()).toBe('<div></div>');
  });

    it('should render single tag with boolean attribute', () => {
    const tag = new Tag('input', { type: 'checkbox', checked: true });
    expect(tag.toString()).toBe('<input type="checkbox" checked>');
  });

  it('should ignore boolean attribute if false', () => {
    const tag = new Tag('input', { type: 'checkbox', checked: false });
    expect(tag.toString()).toBe('<input type="checkbox">');
  });

  it('should render paired tag with attributes and content', () => {
    const tag = new Tag('div', { class: 'container' }, 'Hello');
    expect(tag.toString()).toBe('<div class="container">Hello</div>');
  });
});