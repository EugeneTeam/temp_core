import { NotFoundException } from '@nestjs/common';

export function isNotFoundExceptions<Type>(
  data: any[] | number,
  message: string,
): Type | never {
  const dataIsArray: boolean = Array.isArray(data) && data.length < 1;
  const dataIsNumber: boolean = typeof data === 'number' && data <= 0;

  if (dataIsArray || dataIsNumber) {
    throw new NotFoundException(message);
  }

  return dataIsArray ? data[0] : data;
}
