export type RuleCallback = (value: any) => boolean | string;

type Rules = {
    [rule: string]: (...args: any[]) => RuleCallback | boolean | string
}

import rules from '@/helpers/rules';

class Validator {
    _rules: Rules = rules;

    constructor(rules: Rules|null = null) {
        if(rules) {
            this._rules = rules;
        }
    }

    parseRules(rulesStr: string) {
        return rulesStr.split('|').map(ruleStr => {
            const [rule, argsStr] = ruleStr.split(':');
            const args = argsStr ? argsStr.split(',') : [];
            return { rule, args };
        });
    }

    validate(value: any, rulesStr: string): string[] {
        const rules = this.parseRules(rulesStr);
        const errors = [];

        for (const { rule, args } of rules) {
            const valid = this._rules[rule];
            if (valid) {
                let result;
                if (typeof valid === 'function') {
                    if (valid.length === args.length + 1) { // a regra aceita um valor diretamente
                        result = valid(...args, value);
                    } else { // a regra retorna uma função de callback
                        const callback = valid(...args) as RuleCallback;
                        result = callback(value);
                    }
                } else if (typeof valid === 'string') {
                    result = valid;
                }
                if (typeof result === 'string') {
                    errors.push(result);
                }
            }
        }

        return errors;
    }

    rules(rulesStr: string): RuleCallback[] {
        const rules = this.parseRules(rulesStr);
        const rulesCallback: RuleCallback[] = [];

        for (const { rule, args } of rules) {
            const valid = this._rules[rule];
            if (typeof valid !== 'function') continue;

            if (valid.length === args.length + 1) { // a regra aceita um valor diretamente
                rulesCallback.push(valid as RuleCallback);
            } else { // a regra retorna uma função de callback
                const callback = valid(...args) as RuleCallback;
                rulesCallback.push(callback);
            }
        }

        return rulesCallback;
    }
}

export default Validator;
