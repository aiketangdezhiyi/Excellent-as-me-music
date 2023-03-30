import request from "./request";
export async function searchByKeyWord({ keyword = "", page = 1, size = 30 } = {}) {
    // 查找歌曲
    return request.get('/api/song/search', {
        params: {
            keyword,
            page,
            size
        }

    });
}

export async function searchKeyWord({ keyword = "" } = {}) {
    // 查找关键词
    return request.get('/api/song/word/search', {
        params: {
            keyword
        }

    });
}