import request from "./request";

// 获取访问空间的用户信息
export async function getVisitInfo(id) {
    id = + id;
    if(Number.isNaN(id)) {
        return null;
    }
    return request.get(`/api/visit/user/${id}`);
}

// 选项获取用户歌曲
export async function getNewSongList(id,type) {
    id = + id;
    type = + type;
    if(Number.isNaN(id) || Number.isNaN(type)) {
        return null;
    }
    return request.get(`/api/visit/song/${id}?type=${type}`);
}

// 选项获取用户歌曲
export async function getVisitFavoriteList(id) {
    id = + id;
    if(Number.isNaN(id) ) {
        return null;
    }
    return request.get(`/api/visit/favorite/${id}`);
}