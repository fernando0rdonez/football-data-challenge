import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { CustomException } from '../common/exceptions/custom-execption';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context?.req?.res;

    let statusCode = HttpStatus.OK;
    let message = exception.message;
    let code = 'UNNOWK_ERROR';
    let typename = 'GLOBAL';
    if (exception instanceof CustomException) {
      statusCode = exception.getStatus();
      message = exception.message;
      code = exception.getCodeName();
      typename = exception.getTypeName();
    }

    response?.status(statusCode)?.json({
      __typename: typename,
      statusCode: statusCode,
      message: message,
      code: code,
    });
  }
}
