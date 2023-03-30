<template>
  <div
    @click="changeSong"
    class="song-item-wrapper"
    :class="{
      active: playingIndex === index,
    }"
  >
    <span>{{ index + 1 }}</span>
    <span class="song-name text-ellipsis">{{ songItem.originName }}</span>
    <span class="song-time">{{ songItem.duration | formatTime }}</span>
    <span class="song-ico">
        <i v-if="playingIndex === index" class="color-cyan">正在播放</i>
        <i ref="deleteRef" @click="deleteSong" v-else class="el-icon-delete"></i>
    </span>
  </div>
</template>

<script>
import { formatTime } from "@/utils/time";
import { mapState } from "vuex";
export default {
  props: {
    songItem: Object,
    index: Number,
  },
  computed: {
    ...mapState("Song", ["playingIndex"]),
  },
  filters: {
    formatTime,
  },
  mounted() {
    this.$emit("mounted");
  },
  methods : {
      changeSong(e) {
          if(e.target === this.$refs.deleteRef || this.playingIndex === this.index) {
              return ;
          }
          this.$store.commit("Song/setPlayingIndex",this.index);
      },
      deleteSong(){
        this.$store.commit("Song/cancelSong",this.index);
      }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.song-item-wrapper {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #42484e;
  font-size: 14px;
  color: #77777e;
  cursor: pointer;
  position: relative;
  
  span:nth-of-type(1) {
    display: inline-block;
    width: 27px;
    text-align: center;
  }
  .song-name {
    display: inline-block;
    color: #d3d3d3;
    width: 180px;
    vertical-align: middle;
  }
  .song-time {
    float: right;
    width: 60px;
  }
  .song-ico {
      position: absolute;
      text-align: center;
      opacity: 0;
      right :   88px;
      transition: opacity,color .2s;
      &:hover {
          color : @cyan;
      }
  }
  &:hover {
    background: lighten(#40444b, 5%);
    .song-ico {
        opacity: 1;
    }
  }
  &.active {
    background: #40444b;
  }
  
}
</style>