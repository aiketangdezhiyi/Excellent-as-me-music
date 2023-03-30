export const sortAsc = (arr) => { // 默认将所有的序号进行升序排序
    arr.sort((a, b) => a - b);
}

/**
 * 比较两个数组，筛选出之前存在但现在不存在的数组项以及之前不存在但现在存在的数组项
 * 这个函数用于辅助收藏夹处理
 */
export function compareArr(lastArr, curArr) {
    // sortAsc(lastArr);
    // sortAsc(curArr);
    // 先让两个数组有序

    const lastExistButNowNoExist = lastArr.filter(n => curArr.includes(n) === false); // 之前存在但现在不存在的数组项
    const lastNoExistButNowExist = curArr.filter(n => lastArr.includes(n) === false) // 之前不存在但现在存在的数组项

    return {
        lastExistButNowNoExist,
        lastNoExistButNowExist
    }
}


/**
 * 
 * @param {Array} files  文件对象数组
 * @param {String} field  上传字段
 * @param {String} actionUrl 上传地址
 */
export function upload(files, field, actionUrl) {
    const fd = new FormData();
    fd.append(field, files[0], files[0].name);

    return fetch(actionUrl, {
        method: "POST",
        body: fd
    }).then(resp => resp.json());
}