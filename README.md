# eslint-plugin-vue-type-assertion-parens

ESLint plugin to enforce parentheses around TypeScript type assertions in Vue templates.

## Why?

Mainly to create a workaround for this issue:
https://github.com/vuejs/language-tools/issues/2104

But also to potentially improve readability and prevent other parsing ambiguities.

**❌ Bad:**
```vue
<template>
  <MyComponent :prop="value as MyType" />
</template>
```

**✅ Good:**
```vue
<template>
  <MyComponent :prop="(value as MyType)" />
</template>
```

## Installation

```bash
npm install --save-dev eslint-plugin-vue-type-assertion-parens
```

## Usage

Add the plugin to your ESLint configuration:

### Using the recommended config

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue-type-assertion-parens/recommended'
  ]
};
```

### Manual configuration

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['vue-type-assertion-parens'],
  rules: {
    'vue-type-assertion-parens/type-assertion-parens': 'error'
  }
};
```

## Rule Details

This rule enforces that TypeScript type assertions in Vue templates are wrapped in parentheses.

### Example

**❌ Incorrect:**
```vue
<template>
  <MyComponent :prop="value as unknown as MyType" />
</template>
```

**✅ Correct:**
```vue
<template>
  <MyComponent :prop="(value as unknown as MyType)" />
</template>
```

## Auto-fix

This rule supports ESLint's auto-fix feature. Run ESLint with the `--fix` flag to automatically add parentheses around type assertions.

## Requirements

- ESLint >= 7.0.0
- eslint-plugin-vue >= 8.0.0
- Vue.js with TypeScript

## License

MIT
