import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

export class AddUser implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    request.body = {
      ...request.body,
      User: request['user'],
    };

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
