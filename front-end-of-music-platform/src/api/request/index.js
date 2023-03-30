// 将axios对象进行封装 提供一个request对象
import axios from "axios";

async function delay(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

const authorization = localStorage.getItem('authorization');
const instance = axios.create({
    // 统一配置
    headers: {
        "content-type": "application/json", // 默认都是发json 个别接口自行改动
        'authorization' : JSON.parse(authorization) // 默认将authorization发往服务器端
    }
})


// 拦截器
instance.interceptors.response.use(async function (response) {
    // 对响应数据做点什么

    if(response.headers.authorization) {
        // 如果服务器返回jwt令牌
        localStorage.setItem("authorization",JSON.stringify(response.headers.authorization));
    }
    // 做一个延迟效果
    if (process.env.NODE_ENV !== 'production') {
        // 生产环境下做一个延迟加载的效果
        await delay(1000);
    }

    return response.data;  // 返回服务器响应的数据
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;