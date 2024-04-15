import { logger, getMiddleware } from "./root-store";

describe("Root Store", () => {
  it("should include logger middleware in development environment", () => {
    const middlewares = getMiddleware(true);
    expect(middlewares).toContain(logger);
  });

  it("should not include logger middleware in non-development environment", () => {
    const middlewares = getMiddleware(false);
    expect(middlewares).not.toContain(logger);
  });
});
