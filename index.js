import typeAssertionParens from './rules/type-assertion-parens';

const plugin = {
  rules: {
    'type-assertion-parens': typeAssertionParens,
  },
  configs: {
    recommended: {
      plugins: ['vue-type-assertion-parens'],
      rules: {
        'vue-type-assertion-parens/type-assertion-parens': 'error',
      },
    },
  },
};

export default plugin;
