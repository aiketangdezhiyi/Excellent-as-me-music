import request from "./request";
export async function getAllSinger({  page = 1, size = 10 ,keyword=""} = {}) {
    // 查找歌曲
    return request.get('/api/singer/all', {
        params: {
            page,
            size,
            keyword
        }

    });
}