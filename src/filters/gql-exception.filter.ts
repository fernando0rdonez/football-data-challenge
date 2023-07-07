import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { CustomException } from 'src/common/exceptions/custom-execption';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.req.res;

    response.status(exception.getStatus()).json({
      __typename: exception.getTypeName(),
      statusCode: exception.getStatus(),
      message: exception.message,
      code: exception.getCodeName(),
    });
  }
}
