import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { GqlThrottlerGuard } from '../../../src/common/guards/gql-throttle.guard';
import { ThrottlerModule } from '@nestjs/throttler';

describe('GqlThrottlerGuard', () => {
  let guard: GqlThrottlerGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          ttl: 60,
          limit: 10,
        }),
      ],
      providers: [GqlThrottlerGuard],
    }).compile();

    guard = moduleRef.get<GqlThrottlerGuard>(GqlThrottlerGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('getRequestResponse', () => {
    it('should return the request and response objects from the GraphQL context', () => {
      const mockResponse = {};
      const mockRequest = {
        res: mockResponse,
      };

      const mockExecutionContext: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as any;

      const mockGqlExecutionContext = {
        getContext: jest.fn(() => ({
          req: mockRequest,
          res: mockResponse,
        })),
      };

      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(mockGqlExecutionContext as any);

      const result = guard.getRequestResponse(mockExecutionContext);

      expect(GqlExecutionContext.create).toHaveBeenCalledWith(
        mockExecutionContext,
      );
      expect(result).toEqual({ req: mockRequest, res: mockResponse });
    });
  });
});
