// 返回DOM元素边框盒外框相对文档最顶部的距离
export function getDOMOffsetTopByDocumentTop(dom) {
  let offsetTop = 0;
  let parent = dom;
  while (parent) {
    if (parent !== dom) {
      offsetTop += parent.clientTop; // 加上边框
    }
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return offsetTop;
}
// 返回DOM元素边框盒外框相对文档最左边的距离
export function getDOMOffsetLeftByDocumentLeft(dom) {
  let offsetLeft = 0;
  let parent = dom;
  while (parent) {
    if (parent !== dom) {
      offsetLeft += parent.clientLeft; // 加上边框
    }
    offsetLeft += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return offsetLeft;
}

export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
