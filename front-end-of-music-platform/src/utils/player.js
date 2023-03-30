export default class AudioPlayer {
  // 音乐播放器
  constructor() {
    this.audioDOM = document.createElement("audio");
    this.status = "pause";
  }

  initAudio(url, volume, totalTime) {
    // 初始化audio实例
    this.resetCurTime();
    this.status = "pause";
    this.audioDOM.src = url;
    this.audioDOM.load(); // 加载歌曲
    this.totalTime = totalTime;
    this.setVolume(volume);
  }
  setTotalTime(time) {
    // 设置总时间 s
    this.totalTime = time;
  }
  play() {
    this.audioDOM.play();
    this.status = "play";
  }
  pause() {
    this.audioDOM.pause();
    this.status = "pause";
  }
  goToTime(time) {
    // 跳转到歌曲的某个时间点
    this.audioDOM.currentTime = time;
  }
  setVolume(volume) {
    // 设置声音大小
    volume = volume.toFixed(2);
    this.audioDOM.volume = volume;
  }
  resetCurTime() {
    this.audioDOM.currentTime = 0;
  }
  changeSong(url, totalTime) {
    this.resetCurTime();
    this.audioDOM.src = url;
    this.audioDOM.load(); // 加载歌曲
    this.totalTime = totalTime;
  }
  setTimeUpdateEvent(event) {
    this.audioDOM.addEventListener("timeupdate", function () {
      event(this.currentTime);
    });
  }
}

export const audio = new AudioPlayer();
