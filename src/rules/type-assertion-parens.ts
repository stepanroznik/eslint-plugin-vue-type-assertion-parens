
import { Rule } from 'eslint';
import { defineTemplateBodyVisitor } from 'eslint-plugin-vue/lib/utils/index.js';

const rule: Rule.RuleModule = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce parentheses around type assertions in Vue templates",
      recommended: false,
      url: "https://github.com/stepanroznik/eslint-plugin-vue-type-assertion-parens#readme",
    },
    fixable: "code",
    schema: [],
    messages: {
      missingParens: "Type assertion in Vue template should be wrapped in parentheses.",
    },
  },

  create(context: Rule.RuleContext) {
    const sourceCode = context.getSourceCode();

    function isPartOfChainedAssertion(node: any) {
      // Check if this node is the left side of another type assertion
      // (meaning it's part of a chain like: expr as Type1 as Type2)
      return node.parent && node.parent.type === 'TSAsExpression' && node.parent.expression === node;
    }

    function isWrappedInParens(node: any) {
      // Get the source text around the node
      const startIndex = node.range[0] - 1;
      const endIndex = node.range[1];
      
      if (startIndex < 0 || endIndex >= sourceCode.text.length) {
        return false;
      }
      
      const charBefore = sourceCode.text[startIndex];
      const charAfter = sourceCode.text[endIndex];
      
      return charBefore === '(' && charAfter === ')';
    }

    function checkAssertion(node: any) {
      // Skip if this assertion is part of a chained assertion
      // (we only want to enforce parentheses on the outermost assertion)
      if (isPartOfChainedAssertion(node)) return;
      
      if (isWrappedInParens(node)) return;

      context.report({
        node,
        messageId: "missingParens",
        fix(fixer) {
          return fixer.replaceText(node, `(${sourceCode.getText(node)})`);
        },
      });
    }

    return defineTemplateBodyVisitor(context, {
      // Handle TypeScript 'as' assertions
      // Note: Angle bracket assertions (<Type>value) are not possible in Vue templates
      // due to conflicts with HTML syntax
      TSAsExpression: checkAssertion,
    });
  },
};

export default rule;
