import request from "./request";

export async function getLyricById(id) {
    // 通过id查找歌词
    if(id === null || id === undefined) {
        return {};
    }
    const res = await request.get(`/lyric?id=${id}`);
    
    return res;
}