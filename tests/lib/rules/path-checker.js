const rule = require('../../../lib/rules/path-checker'),
    RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
});
ruleTester.run('path-checker', rule, {
    valid: [
        {
            filename: '/home/johnk/Рабочий стол/repositories/production-TS-ReactJS-project/src/entities/Article',
            code: 'import { addCommentFormActions, addCommentFormReducer } from "../../model/slice/addCommentFormSlice";',
            errors: [],
        },
    ],

    invalid: [
        {
            filename: '/home/johnk/Рабочий стол/repositories/production-TS-ReactJS-project/src/entities/Article',
            code: 'import { addCommentFormActions, addCommentFormReducer } from ' +
                '"entities/Article/model/slice/addCommentFormSlice";',
            errors: [{ message: 'В рамках одного слайса импорты должны быть относительными' }],
        },
        {
            filename: '/home/johnk/Рабочий стол/repositories/production-TS-ReactJS-project/src/entities/Article',
            code: 'import { addCommentFormActions, addCommentFormReducer } from ' +
                '"@/entities/Article/model/slice/addCommentFormSlice";',
            options: [
                {
                    alias: '@'
                }
            ],
            errors: [{ message: 'В рамках одного слайса импорты должны быть относительными' }],
        },

    ],
});
