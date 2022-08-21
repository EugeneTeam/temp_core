import { NotFoundException } from '@nestjs/common';

export function isNotFoundExceptions<Type>(
  data: any[] | number,
  message: string,
): Type | never {
  const conditionWithArray: boolean = Array.isArray(data) && data.length < 1;
  const conditionWithNumber: boolean = typeof data === 'number' && data <= 0;

  if (conditionWithArray || conditionWithNumber) {
    throw new NotFoundException(message);
  }

  return Array.isArray(data) ? data[0] : data;
}
