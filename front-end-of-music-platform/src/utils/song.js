export function formatSongName(name) {
  // 格式化歌名后缀
  const index = name.lastIndexOf(".");
  if (index >= 0) {
    return name.substring(0, index);
  } else {
    return name;
  }
}

export function formatDate(date) {
  const index = date.indexOf("T");
  if (index >= 0) {
    return date.substring(0, index);
  } else {
    return date;
  }
}

// 格式化播放量
export function formatBroadcast(broadcast) {
  let str;
  if (broadcast === 0) {
    str = "绝对零度";
  } else if (broadcast < 100) {
    str = "好像有点冷";
  } else if (broadcast < 1000) {
    str = "小有名气";
  } else if (broadcast < 10000) {
    str = "暖男模范";
  } else if (broadcast < 100000) {
    str = "地球我最HOT";
  } else {
    str = "太阳的温度我知道";
  }
  return str;
}
