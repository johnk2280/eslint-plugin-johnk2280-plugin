
'use strict';

module.exports = {
    meta: {
        type: null, // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'FSD relative path checker',
            recommended: false,
            url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                // example './entities/Article'
                const importTo = node.source.value;

                // example /home/.../eslint-plugin-johnk2280-plugin/lib/rules/path-checker.js
                const fromFilename = context.getFilename();
            }
        };
    },
};
