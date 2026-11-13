import { describe, it, expect } from 'vitest';
import HexletCode from './index';
import Tag from './Tag';

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

describe('HexletCode', () => {
  const template = { name: 'rob', job: 'hexlet', gender: 'm' };

  it('should render empty form with default attributes', () => {
    const form = HexletCode.formFor(template, {}, () => {});
    expect(form).toBe('<form action="#" method="post"></form>');
  });

  it('should render empty form with custom url', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});
    expect(form).toBe('<form action="/users" method="post"></form>');
  });

  it('should render form with input and textarea', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });
    const expected = '<form action="#" method="post"><input name="name" type="text" value="rob"><textarea cols="20" rows="40" name="job">hexlet</textarea></form>';
    expect(form).toBe(expected);
  });

  it('should render form with custom attributes', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });
    const expected = '<form action="#" method="post"><input name="name" type="text" value="rob" class="user-input"><input name="job" type="text" value="hexlet"></form>';
    expect(form).toBe(expected);
  });

  it('should render textarea with custom rows and cols', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('job', { as: 'textarea', rows: 50, cols: 50 });
    });
    const expected = '<form action="#" method="post"><textarea cols="50" rows="50" name="job">hexlet</textarea></form>';
    expect(form).toBe(expected);
  });

  it('should throw error if field does not exist in template', () => {
    expect(() => {
      HexletCode.formFor(template, {}, (f) => {
        f.input('age');
      });
    }).toThrow("Field 'age' does not exist in the template.");
  });
});