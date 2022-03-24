## 11 - 自定义HTLM5视频播放器_batch

### 介绍

- 自制视频播放器的滚动条，暂停键，音量条，倍速条，快进/慢放键

### 设计思路

1. 了解[video标签](https://www.w3school.com.cn/jsref/dom_obj_video.asp)的DOM-API

   1. 播放：play()/ 暂停：pause()
   2. 时间控制：video.currentTime/视频总长度：duration
   3. 音量：volume
   4. 播放速度：playbackRate

2. 对于滚动条设计（最难部分），改变后的滚动条宽度（通过鼠标的offsetX获得）

   ![](C:\Users\98755\Desktop\pj\es6\JS练手\mypj\11 - 自定义HTLM5视频播放器_batch\image-20220214185529544.png)

   与整个滚动框宽度(offsetWinth)的百分比要与video的视频进度形成对应关系，修改滚动条宽度，按照百分比去调整视频时长。因此百分数推荐使用[flex-basis)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)	，这样该值是一个相对于其父弹性盒容器主轴尺寸的[`百分数`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)

3. 确认滚动条DOM操作
   1. 滚动条跟随视频播放进度，需要用[timeupdate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event)监听currentTime的属性变化,最后让flex-basis=视频的进度百分比，就会有跟踪效果
   2. 拖拽
      1. mousedown：确认鼠标准备进行移动
      2. mousemove：改变滚动条的宽度以改变视频当前进度
      3. mouseup：表示结束移动
   3. 点击
      1. click：滚动条直接跳跃到鼠标位置从而改变视频进度
4. click改变视频的快进/后退
5. 两条input滚动条就用change去改变

### 补充

1.  [-moz-range-track](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-moz-range-progress)调整自定义滚动条样式
2.  -moz-range-thumb 
3.  -webkit-slider-runnable-track



