module.exports = {
    plugins: ["jest", "react", "react-hooks"],
    extends: [
        'plugin:jest/recommended',
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",

    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
    }
};
