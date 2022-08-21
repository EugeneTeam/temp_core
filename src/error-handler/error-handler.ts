import { ERROR_CODES } from './errors.constant';

export function errorHandler(error: any): any {
  switch (error.extensions?.exception?.code) {
    case ERROR_CODES.DUPLICATE.CODE: {
      return {
        code: ERROR_CODES.DUPLICATE.CODE,
        message: ERROR_CODES.DUPLICATE.MESSAGE,
        detail: error.extensions.exception?.detail
      };
    }
    default: {
      console.error(error);
      return error;
    }
  }
}
