export function toLink(url,target = "_blank") {
    // 模拟a标签跳转
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', target);
    //防止反复添加
    a.click();
}