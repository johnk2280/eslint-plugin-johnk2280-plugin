'use strict';

const { isPathRelative } = require('../helpers');
const micromatch = require('micromatch');
const path = require('path');


module.exports = {
    meta: {
        type: null, // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'rule of public api imports',
            recommended: false,
            url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    testFilesPatterns: {
                        type: 'array',

                    },
                },
            },
        ],
        messages: {
            publicApiImports: 'Абсолютный импорт разрешен только из Public API (index.ts)',
            publicApiTestingImports: 'Тестовые данные необходимо импортировать из publicApi/testing.ts',
        },
    },

    create(context) {
        const { alias, testFilesPatterns } = context.options[0] || {};
        const allowedLayers = {
            entities: 'entities',
            features: 'features',
            pages: 'pages',
            widgets: 'widgets',
        };

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                if (isPathRelative(importTo)) {
                    return;
                }

                // [entities, Article, model, types]
                const segments = importTo.split('/');
                const layer = segments[0];

                if (!allowedLayers[layer]) {

                    return;
                }

                const isImportNotFromPublicApi = segments.length > 2;
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({
                        node: node,
                        messageId: 'publicApiImports',
                    });
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.getFilename();
                    const normalizedPath = path.toNamespacedPath(currentFilePath).replace(/\\/g, '/');
                    const isCurrentFileTesting = testFilesPatterns.some(
                        pattern => micromatch.isMatch(normalizedPath, pattern)
                    );

                    if (!isCurrentFileTesting) {
                        context.report({
                            node: node,
                            messageId: 'publicApiTestingImports'
                        })
                    }
                }


            },
        };
    },
};
