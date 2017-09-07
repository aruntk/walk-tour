module.exports = {
  'extends': 'airbnb',
  'env': {
    'es6': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false
  },
  'globals': {
    'app': true,
    'canvg': true,
    'console': true,
    'window': true,
    'document': true,
    'navigator': true,
    'history': true,
    'module': true,
    'require': true,
    'Polymer': true,
    'customElements': true,
    'CustomEvent': true
  },
  'rules': {
    "strict": 0,
    // remove this after porting the ui to polymer 2.0
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': [2, { 'allowAfterThis': true, 'allow': ['_id'] }],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error'
    ]
  }
};
