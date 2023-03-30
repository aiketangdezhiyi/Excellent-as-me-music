// 歌词的工具方法

/* 
我在想要不要把传进来的歌词数据中的时间转成秒数
后来一想，数据这么做也是有道理的
那就用一种不是很精确的做法
截取时间的分秒进行字符串匹配

例如传进来的是 time "02:30" 那么就展示歌词前面几位匹配的
因为不是通过时间去匹配的，所以不是很严格

还是用秒吧。。。
*/
export function findLyricIndex(lyricArr, time) {


    if (lyricArr[0] && lyricArr[0].time === undefined) {
        return -1; //没有传递歌词时间
    }
    let index = -1;
    // findIndex还不太适合
    for (let i = 0; i < lyricArr.length; i++) {
        if (lyricArr[i].time <= time) {
            // 播放时间大于歌词展示的时间
            index = i;
        }
        if (lyricArr[i].time > time) {
            // 下一句歌词的展示时间还不到播放时间
            break;
        }
    }


    return index;
}

// 传进来一个时间字符串转换成秒
export function parseTimeToSecond(time) {
    // 允许没有毫秒
    // "01:30.165" ---> 60 + 30 + .165
    let [m, s, ms] = time.split(/[:.]/g);
    if (m === undefined || s === undefined) {
        return -1;
    }
    if (ms) {
        ms = parseFloat(0 + "." + ms);
    } else {
        ms = 0;
    }
    return m * 60 + (+ s) + ms;
}

