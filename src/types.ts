export type FormField = {
  name: string;
  type: 'input' | 'textarea' | 'submit';
  value: string;
  label?: string;
  attributes?: Record<string, string | number | boolean>;
};