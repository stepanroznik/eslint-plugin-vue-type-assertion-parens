declare module 'eslint-plugin-vue/lib/utils/index.js' {
  import { Rule } from 'eslint';
  
  export function defineTemplateBodyVisitor(
    context: Rule.RuleContext,
    templateBodyVisitor: any,
    scriptVisitor?: any
  ): any;
}
