module.exports = {
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "jsx-a11y/href-no-hash": ["off"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "max-len": [
      "warn",
      {
        "code": 100,
        "tabWidth": 2,
        "comments": 100,
        "ignoreComments": false,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}
