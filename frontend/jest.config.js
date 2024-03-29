const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "ts-jest",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/fileMock.ts",
        "\\.(css|less|scss)$": "<rootDir>/src/styleMock.ts",
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>/",
        }),
        "react-spring/renderprops":
            "<rootDir>/node_modules/react-spring/renderprops.cjs",
        "react-spring": "<rootDir>/node_modules/react-spring/web.cjs",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testEnvironment: "jsdom",
};
