import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.(ts)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true
    }
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts)$',
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/__helpers__'
  ],
};

export default config;