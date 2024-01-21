import { VerfiyTokenMiddleware } from './verfiy-token.middleware';

describe('VerfiyTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new VerfiyTokenMiddleware()).toBeDefined();
  });
});
