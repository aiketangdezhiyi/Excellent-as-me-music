// 因为需要将数据从SearchList引到Song，跨组件，优先考虑用vuex
// 当然eventBus也可以，但eventBus主要还是跨组件通信，对于数据存储不如vuex
import api from "@/api";
import { getRandom } from "@/utils";

const jpg = ["1.jpg", "2.jpg", "3.jpg"];

export default {
  namespaced: true, // 开启命名空间
  state: {
    songImgSrc:
      "https://imgessl.kugou.com/stdmusic/20191114/20191114114810198400.jpg", // 歌曲的封面
    playSongId: -1, // 列表歌曲中跳转过来的要播放的歌曲
    songList: [], // 当前正在播放的歌单
    playingIndex: 0, // 正在播放的是歌单中的那一条歌曲
    // 然后把这条歌的信息展示到各个数据
    bg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-08-22%2F5b7cda02193c2.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646182008&t=59a23628217eb29da3ced7bfa136e582", // 当歌词没有时默认展示歌曲动画
  },
  getters: {
    songItem(state) {
      return state.songList[state.playingIndex];
    },
  },
  mutations: {
    setPlayingIndex(state, index) {
      state.playingIndex = index;
    },
    setPlaySongId(state, id) {
      console.log(state);
      state.playSongId = id;
    },
    setSongList(state, songList) {
      state.songList = songList; // 歌曲列表
      // 这里因为不是直接添加歌曲而是要做整个歌曲列表
    },
    nextSong(state) {
      const len = state.songList.length;
      state.playingIndex = (state.playingIndex + 1) % len;
    },
    prevSong(state) {
      const len = state.songList.length;
      state.playingIndex = (state.playingIndex - 1 + len) % len;
    },
    setBg(state, bg = `/animation/${jpg[getRandom(0, jpg.length)]}`) {
      state.bg = bg;
    },
    cancelSong(state, index) {
      if (state.songList.length === 1) {
        // 只有一首歌
        // 删除无效
        return;
      }
      state.songList.splice(index, 1);
    },
  },
  actions: {
    async getSongList(
      { commit },
      {
        id, // 歌单列表id
        type = 1, // 1 歌单 2 用户session歌单 3 一首歌
      }
    ) {
      // 如果歌曲列表没有获取或是直接复制网址就请求歌曲
      if (type == 1) {
        const res = await api.getSongByFavoriteId(id); // 有可能被截获后返回null

        if (res && res.code === 200) {
          commit("setSongList", res.data.data.rows);
          commit("setPlayingIndex", 0);
          return res;
        }
      } else if (type === 3) {
        const res = await api.findOneSong(id);
        if (res && res.code === 200) {
          commit("setSongList", [res.data]);
          commit("setPlayingIndex", 0);
          return res;
        }
      }
      return null;
    },
  },
};
