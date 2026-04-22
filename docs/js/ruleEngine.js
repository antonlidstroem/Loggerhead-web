// js/ruleEngine.js

export class RuleEngine {
    constructor(baseRules = []) {
        this.rules = [...baseRules];
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    removeRule(index) {
        this.rules.splice(index, 1);
    }

    apply(text) {
        let result = text;

        for (const rule of this.rules) {
            if (rule.type === "replace") {
                result = result.replace(rule.pattern, rule.replacement);
            }

            if (rule.type === "remove") {
                result = result.replace(rule.pattern, "");
            }
        }

        return result;
    }

    getRules() {
        return this.rules;
    }
}
