// 用来判断某一个参数不为null
exports.checkedArgumentNull = function (prop) {
    if (prop === null || prop === undefined) {
        return true;
    }
    return false;
}



/**
 * 
 * @param  {...any} props 
 * @returns 
 * 同时检查多个参数是否都是null或undefined
 * 如果有参数为null或undefined,返回false
 * 全部参数不为null或undefined,返回true
 */
exports.checkedArgumentsNotNull = function (...props) {
    return props.map(prop => exports.checkedArgumentNull(prop)).filter(item => item).length === 0;
}

// 检查某个参数的类型
exports.checkedType = function (prop, type) {
    return exports.getType(prop) === type;
}


// 传入某一个确定的值，返回一个确定的类型
// 主要是为了与checkedType相配合
exports.getType = function (data = "") {
    var tempStrs = {
        "[object Array]": 'array',
        "[object Object]": 'object',
        "[object Number]": 'number - object',
        "[object Boolean]": 'boolean - object',
        "[object String]": 'string - object'
    },
        tempString = Object.prototype.toString;
    if (data === null) {
        return 'null';
    }
    if (typeof data === 'object') {
        return tempStrs[tempString.call(data)];
    } else {
        return typeof data;
    }
}


/**
 * 同时传入多个参数和类型进行检验
 * @param {Array} props 参数数组 
 * @param {Array} types 类型数组
 */
exports.checkAllType = function (props, types) {
    if (!exports.checkedType(props,exports.getType([])) ||
        !exports.checkedType(types,exports.getType([]))  ||
        props.length !== types.length) {
            console.log("abc");
        return false;
    }
    let flag = true;
    for (let i = 0; i < props.length; i++) {
        flag = exports.checkedType(props[i], types[i]);
        if (!flag) {
            break;
        }
    }
    return flag;
}