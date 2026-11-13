import Tag from './Tag';
import { FormField } from './types';

export const renderField = (field: FormField): string => {
  if (field.type === 'submit') {
    return new Tag('input', { type: 'submit', value: field.value }).toString();
  }

  // Рендерим лейбл с учетом кастомных атрибутов (labelHtml)
  const labelAttrs = { for: field.name, ...(field.labelHtml || {}) };
  const label = new Tag('label', labelAttrs, field.label).toString();
  
  let element = '';
  const safeAttributes = field.attributes || {};

  if (field.type === 'textarea') {
    const attrs = { cols: 20, rows: 40, name: field.name, ...safeAttributes };
    element = new Tag('textarea', attrs, field.value).toString();
  } else {
    const attrs = { name: field.name, type: 'text', value: field.value, ...safeAttributes };
    element = new Tag('input', attrs).toString();
  }

  return label + element;
};