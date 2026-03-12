import { Transform } from 'class-transformer';

export const EmptyStringToNull = () =>
  Transform(({ value }) => (value === '' ? null : value));