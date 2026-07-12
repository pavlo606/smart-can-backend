import { Transform } from 'class-transformer';

export const StringToUpperCase = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : null));