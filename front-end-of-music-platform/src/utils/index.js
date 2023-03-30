export * from "./form";

export * from "./search";

/**
 * 用来处理请求码
 * 拿到一个promise，如果code === 200 返回一个数据,否则提示然后返回null
 * isShowSuccess 是否提示成功信息
 */
export async function handleRequestMessage(
  requestPro,
  errorMessage = "咦，好像有点小问题哦！",
  isShowSuccess,
  successMessage
) {
  // 绑定Vue.prototype
  const res = await requestPro;
  if (res.code === 200) {
    isShowSuccess &&
      this.$message({
        message: successMessage,
        type: "success",
        duration: 1500,
      });
    return res;
  } else {
    this.$message({
      message: errorMessage,
      duration: 1500,
      type: "warning",
    });
    return null;
  }
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function throttle(func, duration) {
  // 节流

  let lastTime = 0;
  return function (...args) {
    const nowTime = Date.now();
    if (nowTime - lastTime >= duration) {
      const result = func.apply(this, args);
      lastTime = nowTime;
      return result;
    }
  };
}
