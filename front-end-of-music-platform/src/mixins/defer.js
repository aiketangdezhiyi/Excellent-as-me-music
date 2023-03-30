export default function (maxFrameCount) { // 最大帧数
    return {
        data () {
            return {
                curFrameCount : 0
            }
        },
        mounted () {
            // 从挂载开始计算关键帧

            const addFrameCount = () => {
                this.curFrameCount ++;
                if(this.curFrameCount < maxFrameCount) {
                    // 小于最大帧 继续调用 计算当前关键帧
                    requestAnimationFrame(addFrameCount);
                } 
            }
            requestAnimationFrame(addFrameCount);
        },
        methods : {
            showComponent(frameCount) {
                // frameCount 这个组件要在第几帧展示
                return this.curFrameCount >= frameCount; 

            }
        }
    }
}