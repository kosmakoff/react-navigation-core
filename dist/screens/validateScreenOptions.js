"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const deprecatedKeys = ['tabBar'];
/**
 * Make sure screen options returned by the `getScreenOption`
 * are valid
 */
function validateScreenOptions(screenOptions, route) {
    const keys = Object.keys(screenOptions);
    const deprecatedKey = keys.find(key => deprecatedKeys.includes(key));
    if (typeof screenOptions.title === 'function') {
        utils_1.invariant(false, [
            `\`title\` cannot be defined as a function in navigation options for \`${route.routeName}\` screen. \n`,
            'Try replacing the following:',
            '{',
            '    title: ({ state }) => state...',
            '}',
            '',
            'with:',
            '({ navigation }) => ({',
            '    title: navigation.state...',
            '})',
        ].join('\n'));
    }
    if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'function') {
        utils_1.invariant(false, [
            `\`${deprecatedKey}\` cannot be defined as a function in navigation options for \`${route.routeName}\` screen. \n`,
            'Try replacing the following:',
            '{',
            `    ${deprecatedKey}: ({ state }) => ({`,
            '         key: state...',
            '    })',
            '}',
            '',
            'with:',
            '({ navigation }) => ({',
            `    ${deprecatedKey}Key: navigation.state...`,
            '})',
        ].join('\n'));
    }
    if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'object') {
        utils_1.invariant(false, [
            `Invalid key \`${deprecatedKey}\` defined in navigation options for \`${route.routeName}\` screen.`,
            '\n',
            'Try replacing the following navigation options:',
            '{',
            `    ${deprecatedKey}: {`,
            ...Object.keys(screenOptions[deprecatedKey]).map(key => `        ${key}: ...,`),
            '    },',
            '}',
            '\n',
            'with:',
            '{',
            ...Object.keys(screenOptions[deprecatedKey]).map(key => `    ${deprecatedKey + key[0].toUpperCase() + key.slice(1)}: ...,`),
            '}',
        ].join('\n'));
    }
}
exports.default = validateScreenOptions;
;
//# sourceMappingURL=validateScreenOptions.js.map