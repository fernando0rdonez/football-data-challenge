import { HttpStatus } from '@nestjs/common';
import { CustomException } from './custom-execption';

export class NotFountException extends CustomException {
  constructor(typeName: string) {
    super(
      'COMPETITION_NOT_FOUND',
      `${typeName} not found`,
      typeName,
      HttpStatus.OK,
    );
  }
}
