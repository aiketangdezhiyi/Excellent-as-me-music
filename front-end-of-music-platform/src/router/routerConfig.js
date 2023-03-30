// import {getAsyncComponent} from "@/utils/components";

// 定义有nav开头的有顶部导航栏

export default [
  {
    path: "/", // 首页
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/login", // 登录
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/nav",
    name: "Nav",
    component: () => import("@/views/LayoutView"),
    children: [
      {
        path: "toplist", // 定为最近上传的歌曲
        name: "TopList",
        component: () => import("@/views/TopList"),
      },
      {
        path: "searchlist",
        name: "Search",
        component: () => import("@/views/Search"),
      },
      {
        path: "song/:songId", // 歌曲播放页 id 歌单id
        name: "Song",
        component: () => import("@/views/Song"),
      },
      {
        path: "songList", // 歌曲列表播放页 query参数 songList number[]
        name: "SongList",
        component: () => import("@/views/Song"),
      },
      {
        path: "songFavlist/:favlistId", // 歌单播放
        name: "SongFavlist",
        component: () => import("@/views/Song"),
      },
      {
        path: "own", // 个人空间
        name: "Own",
        component: () => import("@/views/Own"),
        redirect: { name: "OwnHome" },
        children: [
          {
            path: "upload",
            name: "OwnUpload",
            component: () => import("@/views/Own/Upload"),
          },
          {
            path: "change",
            name: "OwnChange",
            component: () => import("@/views/Own/Change"),
          },
          {
            path: "avatar",
            name: "OwnAvatar",
            component: () => import("@/views/Own/Avatar"),
          },
          {
            path: "home",
            name: "OwnHome",
            component: () => import("@/views/Own/Home"),
          },
          {
            path: "manage/song",
            name: "OwnSong",
            component: () => import("@/views/Own/ManageSong"),
          },
          {
            path: "user/safe",
            name: "OwnSafe",
            component: () => import("@/views/Own/PassWord"),
          },
          {
            path: "user/favlist",
            name: "OwnFavlist",
            component: () => import("@/views/Own/Favlist"),
          },
          {
            path: "follow", // 关注
            name: "OwnFollow",
            component: () => import("@/views/Own/Follow"),
          },
        ],
      },
      {
        path: "favlist",
        name: "Favlist",
        component: () => import("@/views/Favlist"),
      },
      {
        path: "favorite/:id", // 访问空间收藏夹
        name: "VisitFavorite",
        component: () => import("@/views/VisitFavorite"),
      },
      {
        path: "visit/:id", // 访问空间
        name: "Visit",
        component: () => import("@/views/Visit"),
      },
      {
        path: "singer", // 网站用户
        name: "Singer",
        component: () => import("@/views/Singer"),
      },

      {
        path: "addLyric/:id", // 添加歌词
        name: "AddLyric",
        component: () => import("@/views/AddLyric"),
      },
    ],
  },
];
