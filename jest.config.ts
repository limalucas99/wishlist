import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  preset: "@shelf/jest-mongodb",
  coverageProvider: "v8",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts", "**/*.e2e.ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
