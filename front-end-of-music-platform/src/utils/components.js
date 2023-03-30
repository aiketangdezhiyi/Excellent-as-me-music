import Loading from "@/components/Loading";
export function getAsyncComponent(componentPath) {
    const AsyncComponent = () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: import(componentPath),
        // 异步组件加载时使用的组件
        loading: Loading
    })
    return AsyncComponent
}