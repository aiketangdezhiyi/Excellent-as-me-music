import request from "./request";
export async function updateAvatar({ avatarUrl, UserId } = {}) {
    return request.post("/api/user/update/avatar", {
        avatarUrl,
        UserId
    })
}

export async function updateInfo({ name, sex, signature, UserId } = {}) {
    return request.post("/api/user/update/info", {
        name,
        sex,
        signature,
        UserId
    })
}


export async function getSongWithPage({ keyword = "", page = 1, size = 9,option = 0 } = {}) {
    const authorization = localStorage.getItem('authorization');
    if (authorization) {
        return request.get("/api/own/song", {
            params: {
                keyword,
                page,
                size,
                option
            },
            headers: {
                'authorization': JSON.parse(authorization)
            }
        })
    } else {
        return {};
    }

}
