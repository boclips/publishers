module.exports = {
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      diagnostics: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    'boclips-js-security': '<rootDir>/__mocks__/boclips-js-security.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '~(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testMatch: ['**/*.(integrationTest|test).(ts|tsx)'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/(?!antd).+\\\\.js$',
    '<rootDir>/dist/',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./testSetup.ts'],
  modulePaths: ['<rootDir>'],
};
