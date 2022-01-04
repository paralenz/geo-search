import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  logHeapUsage: true,
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts)$',
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/__helpers__'
  ],
  testPathIgnorePatterns: [
    'dist'
  ]
};

export default config;