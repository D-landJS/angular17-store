import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorResponseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => next(req).pipe(catchError(handleErrorResponse));

// catchError is an RxJS operator that catches an error and returns an observable
// throwError is an RxJS operator that throws an error
// throwError es un operador de RxJS que lanza un error
// catchError es un operador de RxJS que captura un error y devuelve un observable

const handleErrorResponse = (
  error: HttpErrorResponse
): ReturnType<typeof throwError> => {
  const errorResponse = `Error code: ${error.status}, message: ${error.message}`;
  return throwError(() => errorResponse);
};
