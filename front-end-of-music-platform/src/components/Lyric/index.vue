<template>
  <div class="lyric-container" ref="lyricContainer" @mouseup="handleScrollEnd">
    <div class="lyric-header">
      <h2>
        <span :title="songItem.originName | formatSongName" class="song-name text-ellipsis">{{ songItem.originName |
          formatSongName
        }}</span>
        <span class="mv-ico"></span>
      </h2>
      <div class="author">
        <span class="creative"><i>上传者：</i><span class="info" @click="routerToHome(songItem.userInfo.id)">{{
          songItem.userInfo.username
        }}</span></span>
        <span class="provider"><i>歌词提供者：</i>
          <span class="info" v-if="providerUserInfo" @click="routerToHome(providerUserInfo.id)">{{
            providerUserInfo.username
          }}</span>
          <span class="info" v-else>没有歌词哦</span>
        </span>
      </div>
    </div>
    <div v-show="lyricArr.length > 0" class="lyric-mask" :style="{
      width: width + 'px',
    }" @mousewheel="handleMouseScroll">
      <div class="scrollbar" ref="scrollbar" @mousedown="handleScrollStart" :style="{
        top: top.value + 'px',
      }"></div>
    </div>
    <div class="lyric-content" v-show="lyricArr.length > 0" ref="lyricContent" :style="{
      width: width - 10 + 'px',
    }">
      <p v-for="(item, index) in lyricArr" :key="index" ref="domArr" :class="{
        active: index === activeIndex,
      }">
        {{ item.word }}
      </p>
    </div>
  </div>
</template>


<script>
import { findLyricIndex } from "../../utils/lyric";
import { mapGetters, mapState } from "vuex";
import { formatSongName } from "@/utils/song";
import gsap from "gsap";
import { throttle } from "@/utils"; // 节流进行优化
import { audio } from "../../utils/player";
export default {
  props: {
    handled: Boolean, // 歌词是否处理过了
    lyricArr: {
      type: Array,
      default: () => [],
    },
    /** 歌词激活时应该出现的位置 */
    showPosition: {
      type: Number,
      default: 176,
    },

  },
  filters: {
    formatSongName,
  },
  data() {
    return {
      barHeight: 0, // 自定义滚定条的一个高度
      wrapperHeight: 0,
      isDrag: false, // 是否开启歌词滚动条的拖拽
      top: {
        // 同样 也是为了渐变效果
        value: 0,
      },
      width: 0,
      activeIndex: 0, // 被激活的歌词索引
      providerUserInfo: null, // 提供该歌词的用户信息
    };
  },
  created() {
    this.handleRefreshProvider(); // 歌词提供者

    audio.setTimeUpdateEvent(currentTime => {
      this.handleCurrentTimeChange(currentTime)
    })
  },
  computed: {
    contentHeight() {
      return parseFloat(
        window.getComputedStyle(this.$refs.lyricContent)["height"]
      );
    },
    scrollHeight() {
      return this.$refs.lyricContent.scrollHeight;
    },
    maxTop() {
      return this.contentHeight - this.barHeight;
    },
    ...mapGetters("Song", ["songItem"]),
    ...mapState("Song", ["bg"]),
  },
  mounted() {
    this.handleMounted();
    document.addEventListener("mouseup", this.handleScrollEnd);
  },

  methods: {

    handleCurrentTimeChange(currentTime) {

      if (!this.lyricArr?.length) {
        return;
      }
      const index = findLyricIndex(this.lyricArr, currentTime); // 找到当前正在播放的歌词索引
      if (index === this.activeIndex) return;

      this.activeIndex = index;


      const activeItemDOM = this.$refs.domArr[index];
      if (activeItemDOM.offsetTop <= this.showPosition) {
        // 处理首屏歌词
        this.setCssAnimate(); // 开启css动画
        this.top.value = 0;
        return;
      }
      let diffTop = activeItemDOM.offsetTop - this.showPosition; // 这条公式画个图就很明白了 这个其实就是滚动高度


      this.setCssAnimate(); // 开启css动画
      this.top.value = (diffTop / this.scrollHeight) * this.maxTop; // 设置滚动条的滚动距离
    },
    handleMouseScroll: throttle(function (e) {
      let newTop = this.top.value;
      const rate =
        this.$refs.lyricContent.scrollHeight /
        this.$refs.lyricContent.clientHeight; // 计算出容器实际高度与容器高度的一个比值
      if (rate <= 1) {
        return; // 滚动高度小于容器高度
      }
      const n = 10 * rate;
      if (e.wheelDelta > 0) {
        // 向上滚动
        newTop = newTop - n <= 0 ? 0 : newTop - n;
      } else {
        // 向下滚动
        newTop = newTop + n > this.maxTop ? this.maxTop : newTop + n; // 360 - 66
      }
      this.setCssAnimate(false); // 滚动开始 取消css动画 使用js动画
      gsap.to(this.top, {
        // 数据渐变 让滚动条有动画滚动的效果
        value: newTop,
        duration: 0.3,
      });
    }, 150),
    handleScrollStart(e) {
      document.addEventListener("mousemove", this.handleScrollMove);
      this.isDrag = true;
      this.setCssAnimate(false); // 拖拽开始 取消css动画 要求实时性
      this.startTop = this.top.value; // 拖拽开始时滚动条的一个高度
      this.lastScrollTop = e.clientY;
    },
    handleRefreshProvider() {
      // 处理歌词提供者信息
      if (this.songItem.lyricProviderId === null) {
        this.providerUserInfo = null;
      }
      if (this.songItem.lyricProviderId === this.songItem.userInfo.id) {
        // 本人上传不需要请求歌词提供者信息
        this.providerUserInfo = this.songItem.userInfo;
      } else if (typeof this.songItem.lyricProviderId === "number") {
        // 发送请求到后台询问歌词提供者信息
        this.$api.getProviderUserInfo(this.songItem.lyricProviderId);
      }
    },
    handleScrollMove(e) {
      if (!this.isDrag) {
        return;
      }
      const moveY = e.clientY - this.lastScrollTop; // 以拖拽开始为准，计算鼠标移动垂直距离

      let curTop = this.startTop + moveY;
      //   边界处理
      curTop = curTop < 0 ? 0 : curTop;
      curTop = curTop > this.maxTop ? this.maxTop : curTop;
      this.top.value = curTop;
    },
    handleScrollEnd() {
      // 控制滚动
      document.removeEventListener("mousemove", this.handleScrollMove);
      this.isDrag = false;
    },
    routerToHome(id) {
      // 访问个人空间
      this.$router.push({
        path: `/visit/${id}`,
      });
    },
    handleMounted() {
      this.barHeight = parseFloat(
        window.getComputedStyle(this.$refs.scrollbar)["height"]
      );
      this.width =
        parseFloat(
          window.getComputedStyle(this.$refs.lyricContainer)["width"]
        ) - 10; // 处理滚动条事件效果失效
    },
    setCssAnimate(willChange = true) {
      // true 将要开启css动画 false 将要关闭css动画
      if (this.startCssAnimation && willChange) {
        // 已经开启了css动画
        return;
      }
      if (!this.startCssAnimation && !willChange) {
        // 已经关闭了css动画
        return;
      }
      if (willChange) {
        // 开启css动画
        this.$refs.scrollbar.style.transition = `top .5s`; // 播放导致的滚动条效果设置动画
        this.$refs.lyricContent.style.scrollBehavior = "smooth"; // 进行动画和拖拽效果的优化
        this.startCssAnimation = true; // 修改状态
      }
      if (!willChange) {
        // 关闭css动画
        this.$refs.scrollbar.style.transition = "none"; // 拖拽导致的滚动条效果应该是实时的
        this.$refs.lyricContent.style.scrollBehavior = "auto"; // 进行动画和拖拽效果的优化
        this.startCssAnimation = false;
      }
    },
  },
  watch: {
    songItem() {
      // 歌曲切换时做一些操作
      this.handleRefreshProvider();
    },
    ["top.value"](curTop) {
      // 统一修改滚动条高度，通过监听滚动条来设置歌词容器的滚动距离
      this.$refs.lyricContent.scrollTop =
        (curTop / this.maxTop) * this.scrollHeight; // 设置歌词的滚动距离
    },
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.handleScrollEnd);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";

.lyric-container {
  font-family: Microsoft YaHei;
  width: 448px;
  height: 100%;
  color: #fff;
  position: relative;
  z-index: 10;

  .lyric-mask {
    height: 65%;
    overflow-y: hidden;
    box-sizing: border-box;
    padding-right: 10px;
    position: absolute;
    z-index: 10;

    .scrollbar {
      height: 66px;
      width: 10px;
      border-radius: 20px;
      background: #fff;
      opacity: 0.2;
      position: absolute; // 绝对定位，方便设置滚动条位置
      right: 0; // 设置滚动条在最右边
      cursor: pointer;

      &:hover {
        opacity: 0.3;
      }
    }
  }

  .lyric-header {
    height: 60px;
    margin-bottom: 27px;

    h2 {
      margin: 0;
      height: 38px;
      line-height: 38px;
      margin-top: -10px;

      span {
        display: inline-block;
        height: 38px;
        line-height: 38px;
        font-weight: 400;
        font-size: 21px;
      }

      .song-name {
        max-width: 270px;
        display: inline-block;
        vertical-align: middle;
      }

      .mv-ico {
        background: url(~@/assets/song.png) no-repeat;
        display: inline-block;
        width: 25px;
        height: 13px;
        vertical-align: middle;
        margin-left: 10px;
        background-position: 0 -214px;
        cursor: pointer;

        &:hover {
          background-position: -35px -214px;
        }
      }
    }

    .author {

      .creative,
      .provider {
        font-size: 14px;
        margin-top: 5px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
      }

      .info {
        width: 85px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:hover {
          color: @cyan;
        }
      }
    }

    .creative {
      display: inline-block;
      margin-right: 10px;
    }
  }

  .lyric-content {
    height: 65%;
    overflow-y: hidden;
    box-sizing: border-box;
    padding-right: 10px;
    position: absolute;
    overflow: hidden;

    p {
      transition: all 0.8s;
      height: 34px;
      opacity: 0.6;
    }

    p.active {
      opacity: 1;
      color: #01e5ff;
      transform: scale(1.03) translateX(6px);
    }
  }
}
</style>