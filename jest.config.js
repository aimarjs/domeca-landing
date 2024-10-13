const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 80, // At least 80% branch coverage
      functions: 80, // At least 80% function coverage
      lines: 80, // At least 80% line coverage
      statements: 80, // At least 80% statement coverage
    },
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/", // Ignore dist folder if applicable
    // Add other paths as necessary
  ],
};

module.exports = createJestConfig(customJestConfig);
