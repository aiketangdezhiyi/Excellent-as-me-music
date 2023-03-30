import request from "./request";

export async function getSongByFavoriteId(id) {
    id = + id;
    if (Number.isNaN(id)) {
        return null;
    }
    return request.get(`/api/favorite?favoriteId=${id}`);
}

export async function storeSongInfo(data) {
    // 存储歌曲数据到数据库
    return request.post("/api/store/song", data)
}

export async function getProviderUserInfo(id) {
    if (Number.isNaN(+id)) {
        return null;
    }
    return request.get(`/api/user/provider/info?id=${id}`);
}


export async function recoverySong(songList = []) {
    // 根据id数组请求获取歌曲数据

    songList = songList.map(n => +n);

    return request.post('/api/song/recovery/id/array', {
        songList
    });
}

export async function changeSongName(data) {
    // 修改歌曲名 id newSongName

    return request.post('/api/song/change/song/name', data);
}

export async function changeSongToUnCreative(data) {
    // 修改歌曲为非创作歌曲 id

    return request.post('/api/song/change/song/uncreative', data);
}


export async function applySongToCreative(data) {
    // 申请歌曲为创作歌曲 id userDesc

    return request.post('/api/song/apply/song/creative', data);
}


export async function deleteSong(data) {
    // 删除歌曲 songItem

    return request.post('/api/song/delete', data);
}

export async function requestSongLen({ url }) {
    // 删除歌曲 songItem

    return request.post('/api/song/len', { url });
}


export async function findOneSong(id) {
    if (Number.isNaN(id)) {
        return { msg: "not found" };
    }
    return request.get("/api/song/find/one/" + id);
}

export async function changeLyric(data) {
    return request.post("/api/song/change/lyric", data);
}
