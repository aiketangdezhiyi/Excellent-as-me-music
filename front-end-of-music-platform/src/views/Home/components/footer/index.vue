<template>
  <div class="footer-container">
    <div class="footer-wrapper mx-auto">
      <div class="link-item link-item__left">
        <span class="bt">优我创享</span>
        <div class="link-item__panel">
          <a target="_blank" href="//www.bilibili.com/blackboard/aboutUs.html"
            >关于我们</a
          ><a target="_blank" href="//www.bilibili.com/blackboard/contact.html"
            >联系我们</a
          ><a target="_blank" href="//www.bilibili.com/protocal/licence.html"
            >用户协议</a
          ><a target="_blank" href="//www.bilibili.com/blackboard/join.html"
            >加入我们</a
          ><a
            target="_blank"
            href="//www.bilibili.com/blackboard/friends-links.html"
            >友情链接</a
          ><a
            target="_blank"
            href="//www.bilibili.com/blackboard/privacy-pc.html"
            >隐私协议</a
          ><a
            target="_blank"
            href="//account.bilibili.com/account/official/home"
            >个人网站，欢迎使用，资源长期有效</a
          ><a target="_blank" href="//ir.bilibili.com/">Investor Relations</a>
        </div>
      </div>
      <div class="link-item link-item__center">
        <span class="bt">传送门</span>
        <div class="link-item__panel">
          <a
            target="_blank"
            href="//www.bilibili.com/blackboard/topic/activity-cn8bxPLzz.html"
            >协议汇总</a
          ><a
            target="_blank"
            href="//www.bilibili.com/blackboard/activity-list.html"
            >活动中心</a
          ><a
            target="_blank"
            href="//www.bilibili.com/blackboard/topic_list.html"
            >活动专题页</a
          ><a target="_blank" href="//www.bilibili.com/v/copyright/intro/"
            >侵权申诉</a
          ><a target="_blank" href="//www.bilibili.com/blackboard/help.html"
            >帮助中心</a
          ><a
            target="_blank"
            href="https://www.bilibili.com/blackboard/activity-GBnHKZEX.html"
            >用户反馈论坛</a
          ><a target="_blank" href="//space.bilibili.com/6823116#/album"
            >壁纸站</a
          ><a target="_blank" href="//e.bilibili.com/">广告合作</a
          ><a
            target="_blank"
            href="//www.bilibili.com/blackboard/activity-S1jfy69Jz.html"
            >名人堂</a
          ><a target="_blank" href="//mcn.bilibili.com/studio/mcn/entry"
            >MCN管理中心</a
          ><a target="_blank" href="//www.bilibili.com/video/BV1Xx411c7cH/"
            >高级弹幕</a
          ><a target="_blank" href="//b.bilibili.com/">品牌号官网</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.footer-container {
  margin-top: 50px;
  border-top: 1px solid #eee;
  background-color: #F6F7F8;
  .footer-wrapper {
    width: 1140px;
    padding: 27px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .link-item {
      .bt {
        display: block;
        width: 45%;
        margin-bottom: 27px;
        height: 20px;
        color: #ccc;
        font-size: 16px;
      }
      a {
          display: inline-block; 
          margin-right: 27px;
          margin-bottom: 10px;
          color : @black;
          &:hover {
              color : @purple;
          }
      }
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 992px) {
  // 960
  .footer-container {
      .footer-wrapper {
          width: 960px;
      }
  }
}
@media screen and (max-width: 992px) and (min-width: 768px) {
  // 720
  .footer-container {
      .footer-wrapper {
          width: 720px;
      }
  }
}
@media screen and (max-width: 768px) and(min-width : 576px) {
    // 540
    .footer-container {
      .footer-wrapper {
          width: 540px;
      }
  }
}

@media screen and (max-width: 576px) { 
  // 95%
  .footer-container {
      .footer-wrapper {
          width: 95%;
      }
  }
}
</style>