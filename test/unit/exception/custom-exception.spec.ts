import { HttpStatus, HttpException } from '@nestjs/common';
import { CustomException } from '../../../src/common/exceptions/custom-execption';

describe('CustomException', () => {
  const codeName = 'CODE_NAME';
  const message = 'Exception message';
  const typeName = 'Exception type';
  const code = HttpStatus.BAD_REQUEST;

  class TestException extends CustomException {
    constructor() {
      super(codeName, message, typeName, code);
    }
  }

  let exception: TestException;

  beforeEach(() => {
    exception = new TestException();
  });

  it('should extend HttpException', () => {
    expect(exception).toBeInstanceOf(CustomException);
    expect(exception).toBeInstanceOf(HttpException);
  });

  it('should set the provided properties', () => {
    expect(exception['codeName']).toEqual(codeName);
    expect(exception['typeName']).toEqual(typeName);
    expect(exception['response']).toEqual(message);
    expect(exception['status']).toEqual(code);
  });

  describe('getCodeName', () => {
    it('should return the code name', () => {
      const result = exception.getCodeName();
      expect(result).toEqual(codeName);
    });
  });

  describe('getTypeName', () => {
    it('should return the type name', () => {
      const result = exception.getTypeName();
      expect(result).toEqual(typeName);
    });
  });
});
