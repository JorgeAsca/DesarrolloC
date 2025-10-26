const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname, './'),
  
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverage: true, 
  coverageDirectory: 'coverage',
};