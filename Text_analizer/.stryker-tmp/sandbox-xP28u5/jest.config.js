// @ts-nocheck
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  testMatch: ['<rootDir>/__tests__/**/*.test.ts', '<rootDir>/?(*.)+(spec|test).ts'],
  collectCoverage: true, 
  coverageDirectory: 'coverage',
};