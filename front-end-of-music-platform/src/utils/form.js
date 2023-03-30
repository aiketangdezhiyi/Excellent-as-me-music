export function handleCheckPwd(rule, value = "密码", callback) {
    // 自定义校验密码
    const reg = /^[\d_a-zA-Z]{6,13}$/g;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error(`${value} 不是6到13位字符，且满足数字字母下划线`));
    }
}
