import api from "@/api";
export default {
    namespaced : true, // 开启命名空间
    state : {
        favoriteList : [], // 收藏夹数据
        activeItem : {
            favorite : {
                id : -1
            }
        } // 当前展示的收藏夹
    },
    mutations : {
        setFavoriteList(state,favoriteList) {
            state.favoriteList = favoriteList;
        },
        setActiveItem (state,activeItem) {
            state.activeItem = activeItem;
        },
        removeSongInFavorite(state,handleItem) {
            // 删除某条歌曲在某个收藏夹
            const songArr = state.activeItem.data.rows;
            const index = songArr.findIndex(it=>it === handleItem);
            songArr.splice(index,1);// 保证数组的引用不变，减少渲染带来的消耗
        }
    },
    
    actions : {
        async getFavoriteList({commit}) {
            const {code,data:{data}} = await api.getUserAllFavorite();
            if(code === 200) {
                commit("setFavoriteList",data);
            }
            return data;
        },
    }
}