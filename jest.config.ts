import type { Config } from "@jest/types";

export default {
  moduleFileExtensions: ["js", "json", "ts"],
  coveragePathIgnorePatterns: ["node_modules", "dist", "prisma"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/main.(t|j)s"],
  coverageDirectory: "./coverage",
  verbose: true,
  testEnvironment: "node",
} as Config.InitialOptions;
