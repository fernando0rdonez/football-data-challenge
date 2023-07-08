module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '.dto.ts',
    '.entity.ts',
    '.enum.ts',
    '.interface.ts',
    '.module.ts',
    'config',
    'constants',
    'dto',
    'mock-data.ts',
  ],
  coverageReporters: ['cobertura', 'lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }],
  ],
  testMatch: ['**/*.spec.ts'],
  setupFiles: ['./test/setup-test.ts'],
};
