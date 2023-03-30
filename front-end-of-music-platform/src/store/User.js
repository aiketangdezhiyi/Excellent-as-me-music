// user 数据的状态管理
import * as api from "../api/index";
// import router from "@/router";

export default {
    namespaced: true, // 开启命名空间
    state: {
        username: "",
        user: "", // 账号名
        userId: "",
        isLoading: false,
        avatarUrl: "",
        sex: true, // 性别
        exp: 0, // 积分
        signature: "",// 签名

    },
    mutations: {
        setLoading(state, payload) {
            state.isLoading = payload;
        },
        setUserInfo(state, payload = {
            user: "",
            userId: "",
            username: "",
            avatarUrl: "" // 不传参 注销
        }) { // 设置关于user的所有信息
            state.user = payload.user;
            state.userId = payload.userId;
            state.username = payload.username;
            state.avatarUrl = payload.avatarUrl;
            state.exp = payload.exp ? payload.exp : 0;
            state.sex = payload.sex;
            state.signature = payload.signature;

        },
    },
    actions: {
        async login({ commit }, userInfo) {
            // 登录接口
            commit("setLoading", true);
            const res = await api.userApi.login(userInfo);
            if (res.msg === 'success') {
                // 有查询结果
                commit("setUserInfo", res.data);

            } else {
                commit("setLoading", false);
                return false;
            }
            commit("setLoading", false);
            return true
        },
        async logout({ commit }) {
            api.userApi.logout();
            commit('setUserInfo'); // 清空状态数据
            return true;
        },
        async whoami({ commit }) {
            const res = await api.userApi.whoami();
            
            if (res.data) {
                commit("setUserInfo", res.data);
            }
            // if(res.data && res.data.userId) {
            //     // 验证成功 跳转到个人空间
                
            //     router.push({
            //         name : "Own"
            //     })
            // }
        },
        async refresh({ commit }) {
            const res = await api.userApi.whoami();
            if (res.data) {
                commit("setUserInfo", res.data);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async addUser({ commit }, newUser) {
            return api.userApi.addUser(newUser);
        }
    }
}