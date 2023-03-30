<template>
  <div class="lyric-content">
    <SimplePlayBarComp
      v-if="songItem"
      :songItem="songItem"
      style="margin: 0 auto; width: 566px; display: block;position:relative;z-index:1025;"
    ></SimplePlayBarComp>
    <div class="bg-mask text-center">
      <div ref="canvas" class="canvas text-center"></div>
      <div class="content">
        <h1>
          你正在为名为<span>《{{ songItem ? songItem.originName : " " }}》</span
          >的歌曲添加歌词
        </h1>
        <div class="lyric-group-container">
          <TransitionGroup name="group" :duration="1000">
            <LyricComp
              style="margin: 15px 0"
              v-for="(it, i) in lyricGroup"
              @reset="resetTime"
              @remove="removeLyric"
              :key="it.id"
              :idx="i"
              @input="it.content = $event"
              @add="addLyric"
              :content="it.content"
              :time="it.time"
            />
            <ConfirmBtn
              style="padding: 5px 30px; font-size: 16px; border-radius: 60px"
              key="a"
              content="提交歌词"
              :loading="confirmLoading"
              @click.native="confirmLyric"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// [00:00.000] 作词 : 李艺皓&
// [00:01.000] 作曲 : 李艺皓&
// [00:29.166]太多的 太重的 太残忍的话&
// [00:36.666]没纠缠 是你的 理由太假&
// [00:43.666]我觉得 你大可不必说的天花乱坠&[00:50.415]是天使 是魔鬼 都没有绝对&[00:58.415]没想的 没说的 都请收起吧&[01:05.415]你扮演 的角色 更可悲吗&[01:12.415]放弃的 就大可不必再争辩是非&[01:19.165]放下的 就请你 烧的干脆&[01:26.415]你的一字一句犹如刀疤划心上&[01:30.165]我的一举一动随你改变多荒唐&[01:33.914]任你肆意玩弄 从没去想&[01:37.914]你是有多嚣张&[01:40.914]我的心脏脉搏为你跳动为你狂&[01:44.663]你说我真的多余不如离开流浪&[01:48.164]都怪我 没治愈我的伤&[01:55.913]&[02:24.163]没想的 没说的 都请收起吧&[02:30.913]你扮演 的角色 更可悲吗&[02:38.163]放弃的 就大可不必再争辩是非&[02:45.413]放下的 就请你 烧的干脆&[02:52.161]你的一字一句犹如刀疤划心上&[02:56.412]我的一举一动随你改变多荒唐&[02:59.662]任你肆意玩弄 从没去想&[03:03.661]你是有多嚣张&[03:06.412]我的心脏脉搏为你跳动为你狂&[03:10.662]你说我真的多余不如离开流浪&[03:14.162]都怪我 没治愈我的伤&[03:20.912]你的一字一句犹如刀疤划心上&[03:25.162]我的一举一动随你改变多荒唐&[03:28.412]任你肆意玩弄 从没去想&[03:32.412]你是有多嚣张&[03:35.161]我的心脏脉搏为你跳动为你狂&[03:39.161]你说我真的多余不如离开流浪&[03:42.911]都怪我 没治愈我的伤&
import SimplePlayBarComp from "@/components/SimplePlayBarComp";
import LyricComp from "@/components/LyricComp";
import { formatCurTime } from "../../utils/time";
import ConfirmBtn from "@/components/ConfirmBtn";
let frameId;
export default {
  components: {
    SimplePlayBarComp,
    LyricComp,
    ConfirmBtn,
  },
  data() {
    return {
      loadingSource: true,
      songItem: null,
      lyricGroup: [
        {
          id: 1, // 为了配合transition-group还是需要一个唯一的key
          content: "",
          time: "[00:00:000]",
        },
      ],
      confirmLoading: false,
    };
  },
  async created() {
    document.title = "优我歌词";
    const { code, msg, data, err } = await this.$api.findOneSong(
      +this.$route.params.id
    );
    if (msg === "not found") {
      this.$message({
        message: msg,
        type: "error",
      });
      return;
    }
    if (code === 200) {
      this.songItem = data;
      if (data.lyric) {
        this.lyricGroup = data.lyric.split("&").map((str) => {
          const idx = str.indexOf("]");
          return {
            id : Math.random(),
            time: str.substring(0, idx + 1),
            content: str.substring(idx + 1),
          };
        });
        this.lyricGroup.pop();
      }
    } else {
      this.$message({
        message: err,
        type: "error",
      });
    }
  },
  mounted() {
    const _this = this;
    (function () {
      var ctx,
        w,
        h,
        cx,
        cy,
        PI,
        PI_HALF,
        cos,
        sin,
        random,
        lineWidth,
        C,
        rings,
        ringsLength,
        data;

      ctx = document.createElement("canvas").getContext("2d");
      w = 270;
      h = 270;
      cx = w / 2;
      cy = h / 2;
      rings = [];
      ringsLength = 0;

      PI = Math.PI;
      PI_HALF = PI / 2;
      cos = Math.cos;
      sin = Math.sin;
      random = Math.random;

      lineWidth = 0.2;
      C = ["#ABF8FF", "#E76B76", "#1D2439", "#4F3762", "#67F9FF", "#0C0F18"];

      data = [
        /* ring {t:total_particles, r:radius, d:distance, s:speed, c:color} */
        [
          { t: 80, r: cx - 10, d: 40, s: 30, c: C[1] },
          { t: 60, r: cx - 20, d: 40, s: 80, c: C[2] },
          { t: 20, r: cx - 30, d: 20, s: 80, c: C[2] },
        ],
        [
          { t: 80, r: cx - 80, d: 40, s: 40, c: C[4] },
          { t: 80, r: cx - 90, d: 20, s: 40, c: C[4] },
          { t: 20, r: cx - 100, d: 20, s: 40, c: C[2] },
          { t: 40, r: cx - 110, d: 20, s: 40, c: C[2] },
        ],
        [
          { t: 60, r: cx - 160, d: 40, s: 20, c: C[2] },
          { t: 20, r: cx - 170, d: 30, s: 60, c: C[2] },
          { t: 40, r: cx - 180, d: 40, s: 60, c: C[2] },
        ],
        [
          { t: 40, r: cx - 230, d: 40, s: 20, c: C[5] },
          { t: 20, r: cx - 240, d: 20, s: 10, c: C[5] },
        ],
        [{ t: 10, r: cx - 290, d: 10, s: 10, c: C[4] }],
      ];

      /* */
      ctx.canvas.width = w;
      ctx.canvas.height = h;
      _this.$refs.canvas.appendChild(ctx.canvas);

      data.forEach(function (group) {
        var ring = [];

        group.forEach(function (orbit, i) {
          var total_particles, index;

          total_particles = orbit.t;
          index = 0;

          for (; index < total_particles; index++) {
            var radius, distance, speed, color, opacity;

            radius = orbit.r;
            distance = orbit.d;
            speed = random() / orbit.s;
            speed = i % 2 ? speed : speed * -1;
            color = orbit.c;
            opacity = orbit.o;

            ring.push(new P(radius, distance, speed, color, opacity));

            radius = distance = speed = color = opacity = null;
          }
        });

        rings.push(ring);
      });

      ringsLength = rings.length;

      /* */
      function P(radius, distance, speed, color) {
        this.a = PI / 180;
        this.d = distance;
        this.d2 = this.d * this.d;
        this.x = cx + radius * cos(this.a);
        this.y = cy + radius * sin(this.a);
        this.c = color;
        this.r = random() * 8;
        this.R = random() > 0.5 ? radius : radius - 5;
        this.s = speed;
        this.pos = random() * 360;
      }

      function draw() {
        var i, j, k, xd, yd, d, ring, ringLength, ringLength2, particle, p2;

        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
        ctx.rect(0, 0, w, h);
        ctx.fillStyle = "#151a28";
        ctx.fill();
        ctx.closePath();

        for (i = 0; i < ringsLength; i++) {
          ring = rings[i];
          ringLength = ring.length;
          ringLength2 = ringLength - 100;

          for (j = 0; j < ringLength; j++) {
            particle = ring[j];

            particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
            particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
            particle.pos += particle.s;

            ctx.beginPath();
            ctx.globalAlpha = 0.12;
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = particle.c;
            ctx.arc(particle.x, particle.y, particle.r, PI * 2, false);
            ctx.fill();
            ctx.closePath();

            for (k = 0; k < ringLength2; k++) {
              p2 = ring[k];

              yd = p2.y - particle.y;
              xd = p2.x - particle.x;
              d = xd * xd + yd * yd;

              if (d < particle.d2) {
                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.lineWidth = lineWidth;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = p2.c;
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }

      function loop() {
        draw();
        frameId = requestAnimationFrame(loop);
      }

      loop();
    })();
  },
  methods: {
    addLyric(idx) {
      const time = window.audioDOM ? window.audioDOM.currentTime : 0;
      this.lyricGroup.splice(idx + 1, 0, {
        id: Math.random(),
        content: "",
        time: "[" + formatCurTime(time) + "]",
      });
    },

    resetTime(idx) {
      const time = window.audioDOM ? window.audioDOM.currentTime : 0;
      this.lyricGroup[idx].time = "[" + formatCurTime(time) + "]";
    },
    removeLyric(idx) {
      this.lyricGroup.splice(idx, 1);
    },
    async confirmLyric() {
      // 提交歌词
      this.confirmLoading = true;
      const lyricGroupStr = this.lyricGroup.reduce((prev, cur) => {
        return prev + cur.time + cur.content + "&";
      }, "");
      const data = {
        lyric: lyricGroupStr,
        id: this.songItem.id,
      };
      const { code, err } = await this.$api.changeLyric(data);
      this.confirmLoading = false;
      if (code === 200) {
        this.$message({
          message: "提交成功",
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
  },
  beforeDestroy() {
    cancelAnimationFrame(frameId);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
@import "./groupAnimate.less";
.lyric-content {
  min-height: 100vh;
  background-color: #222;
  .bg-mask {
    width: 1140px;
    margin: 0 auto;
    color: #fff;
    position: relative;
    .canvas {
      position: absolute;
      left: 0;
      top: 0;
    }
    .content {
      width: 600px;
      margin: 0 auto;
      h1 {
        padding: 30px 0;
        font-size: 1.2rem;
        font-weight: normal;
        span {
          color: @cyan;
        }
      }
    }
  }
}
</style>