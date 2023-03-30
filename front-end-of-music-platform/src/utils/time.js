export function formatTime(time) {
  // s -> 01 : 59
  const s = (Math.round(time) % 60) + "";
  const m = Math.floor(Math.round(time) / 60) + "";
  return `${m.padStart(2, "0")} : ${s.padStart(2, "0")}`;
}

export function formatCurTime(time) {
  const timeStr = time + "";
  const idx = timeStr.indexOf(".");
  let hm = "000";
  if (idx >= 0) {
    // 小数点后三位作为毫秒位
    hm = timeStr.split(".")[1].substring(0, 3);
  }
  time = Math.floor(time); // 向下取整
  const s = (Math.round(time) % 60) + "";
  const m = Math.floor(Math.round(time) / 60) + "";
  return `${m.padStart(2, "0")}:${s.padStart(2, "0")}.${hm}`;
}
