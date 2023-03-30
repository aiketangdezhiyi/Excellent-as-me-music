import api from "@/api";
export default {
    namespaced: true, // 开启命名空间
    state: {
        userInfo: null, // 用户的个人信息
        favoriteList: null, // 用户的收藏夹信息
        songList: null, // 用户最近上传的创作歌曲信息 
        activeFavorite: {
            favorite: {
                id: -1
            }
        } // 访问的歌单
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setFavoriteList(state, favoriteList) {
            state.favoriteList = favoriteList;
        },
        setSongList(state, songList) {
            state.songList = songList;
        },
        setActiveFavorite(state, activeFavorite) {
            state.activeFavorite = activeFavorite;
        },
        setActiveFavoriteWidthId(state, favoriteId) {
            const findItem = state.favoriteList.find(it=>it.favorite.id === favoriteId);
            if(findItem) {
                state.activeFavorite = findItem;
            } else {
                state.activeFavorite = state.favoriteList[0]; // 如果找不到就默认展示第一项
            }
            
        }
    },

    actions: {
        async getVisitUserInfo({ commit }, id) {
            const res = await api.getVisitInfo(id);
            if (res.code === 200) {
                const { songList, favoriteList, userInfo } = res.data;
                commit("setUserInfo", userInfo);
                commit("setFavoriteList", favoriteList);
                commit("setSongList", songList);
            }
            return res.data;
        },
        async getNewSongList({ commit }, {id, type}) {
            // 选项获取用户歌曲
            const res = await api.getNewSongList(id, type);
            if (res.code === 200) {
                commit("setSongList", res.data);
            }
            return res.data;
        },
        async getVisitFavoriteList({ commit }, id) {
            const res = await api.getVisitFavoriteList(id);
            if (res.code === 200) {
                commit("setFavoriteList", res.data);
            }
            return res.data;
        }
    }
}