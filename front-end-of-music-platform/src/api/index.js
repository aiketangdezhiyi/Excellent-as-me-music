export * as userApi from "./user"; // 为了兼容以前的版本
export * as songApi from "./song";
// 仓库需要的api，就放在这里的
// 非仓库需要的，文件导出即可

// 这些api没有挂载到Vue实例上，一方面，非全局通用，只是某个组件需要，另一方面，会复杂化组件实例



const requireApi = require.context('.', true, /.js$/);

let module = {};

requireApi.keys().forEach((key) => {
	if (key === './index.js') return
	Object.assign(module, requireApi(key))
})

export default module;