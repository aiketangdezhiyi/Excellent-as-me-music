import request from "./request";

export async function getUserAllFavorite() {
    // 获取用户所有的收藏夹信息
    const res = await request.get("/api/favorite/all"); // 通过authorization拿到数据

    return res;
}

export async function getUserAllFavoriteContext() {
    // 获取用户所有的收藏夹信息
    const res = await request.get("/api/favorite/context"); // 通过authorization拿到数据

    return res;
}


export async function getSongStatusInFavorite({ songId }) {
    // 获取用户所有的收藏夹信息
    const res = await request.get("/api/favorite/song/status", {
        params: {
            songId
        }
    }); // 通过authorization拿到数据

    return res;
}

export async function addFavorite({ name }) {
    // 新建一个收藏夹
    const res = await request.post("/api/favorite/add", {
        name
    }); // 通过authorization拿到数据

    return res;
}

// 修改歌曲在收藏夹的状态
export async function confirmFavorite({
    config,
    songId
}) {
    const res = await request.post("/api/favorite/change/confirm", {
        config,
        songId
    }); // 通过authorization拿到数据

    return res;
}

// 修改收藏夹的封面和名称
export async function changeFavoriteInfo(params) {
    const res = await request.post("/api/favorite/change/info",params); // 通过authorization拿到数据

    return res;
}

// 获取收藏夹作者的昵称
export async function getFavoriteAuthorName(params) {
    const res = await request.post("/api/favorite/author",params); // 通过authorization拿到数据

    return res;
}

// 取消收藏某条歌曲
export async function cancelSongFavorite(params) {
    return request.post("/api/favorite/cancel/song",params); // 通过authorization拿到用户Id
}

// 删除收藏夹
export async function deleteFavorite(params) {
    return request.post("/api/favorite/delete",params); // 通过authorization拿到用户Id用于鉴别是否是用户发出的请求
}