import { HttpStatus, HttpException } from '@nestjs/common';

export abstract class CustomException extends HttpException {
  private readonly codeName: string;
  private readonly typeName: string;
  constructor(
    codeName: string,
    message: string,
    typeName: string,
    code: HttpStatus,
  ) {
    super(message, code);
    this.codeName = codeName;
    this.typeName = typeName;
  }
  getCodeName() {
    return this.codeName;
  }

  getTypeName() {
    return this.typeName;
  }
}
