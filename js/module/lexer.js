import {EL_TYPE, REGEXP, TOKEN_RULE} from "./htmlParserConfig";
import {Tools} from "./tools";

function Lexer() {

}

Object.defineProperties(Lexer.prototype, {
    analysis: {
        value: analysis
    }
});

// function analysis(str) {
//     str = Tools.trim(str);
//     console.time('lexical analysis');
//     const result = [];
//     let start = 0, end = 0, len = str.length - 1;
//     while (end < len) {
//         start = str.indexOf('<', end);                      // 获取tag头下标
//         // 解析文本节点
//         if (start - end > 1) {
//             // console.log(end + 1, start);
//             if (!Tools.isEmpty(str, end + 1, start - 1)) {
//                 result.push(str.slice(end + 1, start));
//             }
//         }
//         end = str.indexOf('>', start);                      // 获取tag尾下标
//
//         result.push(str.slice(start, end + 1));
//     }
//
//     console.timeEnd('lexical analysis');
//     return result;
// }

function analysis(str) {
    str = Tools.trim(str);
    console.time('lexical analysis');
    const result = [];
    let stack = [], char, start = 0, end = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        char = str[i];
        switch (char) {
            case '<':
                if (stack[stack.length - 1] !== '"') {
                    stack.push(char);
                    start = i;
                    if (start - end > 1 && !Tools.isEmpty(str, end + 1, start - 1))
                        result.push(str.slice(end + 1, start));
                }
                break;
            case '>':
                if (stack[stack.length - 1] === '<') {
                    stack.pop();
                    end = i;
                    result.push(str.slice(start, end + 1));
                }
                break;
            case '"':
                if (stack[stack.length - 1] === '"') {
                    stack.pop();
                } else if (stack[stack.length - 1] === '<') {
                    stack.push(char);
                }
        }
    }

    console.timeEnd('lexical analysis');
    return result;
}


export {
    Lexer
}
