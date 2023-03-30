import request from "./request";

export async function getFollowStatus(attentionId) {
    // 获取关注状态
    return request.get(`/api/follow/status?attentionId=${attentionId}`);
}

export async function addFollowStatus(attentionId) {
    // 获取关注状态
    return request.post('/api/follow/add',{
        attentionId
    });
}

export async function deleteFollowStatus(attentionId) {
    // 删除关注状态
    return request.post('/api/follow/delete',{
        attentionId
    });
}

export async function getUserFollowStatus(page,limit) {
    // 获取一个用户的关注状态
    return request.get(`/api/follow/user/all?page=${page}&limit=${limit}`);
}

export async function getUserFollowMe(page,limit) {
    // 获取用户的被关注状态
    return request.get(`/api/follow/me/all?page=${page}&limit=${limit}`);
}

