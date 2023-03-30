import request from "./request";
// 将所需的用户信息传过来进行登录验证
// 登录信息会在表单严格要求
export async function login(user) {
    // 服务器端默认适用jwt做验证
    // 为了响应其他端，默认使用authorization字段
    return await request.post("/api/user/login", user); // authorization字段的处理在拦截器
}

// 验证是否登录过
export async function whoami() {
    const authorization = localStorage.getItem('authorization');
    if(authorization) {
        return request.post("/api/user/whoami",{},{
            headers : {
                'authorization' : JSON.parse(authorization)
            } 
        })
    } else {
        return {};
    }
}


export function logout () {
    localStorage.removeItem('authorization');
    return request.post("/api/user/logout");
}



export async function addUser (user) {
    return await request.post("/api/user/adduser", user);
}



export async function changePwd (data) {
    return request.post("/api/user/change/pwd", data);
}
