## 16 - Mouse Move Shadow会移动的影子

### 介绍

- 移动鼠标，会有影子跟随变化

### 设计思路

1. 修改元素的[text-shadow样式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)中的x，y的偏移量跟鼠标的位置形成对应关系：将整个页面看成一个坐标轴，（鼠标所在的位置的宽/整个页面宽-0.5）*阴影最大移动距离，这样就表示在横轴的移动占比为（-50%，50%），数轴同理
2. 但在订阅事件mousemove采用offsetX获取坐标会有小问题，子元素会影响的问题，触碰对象里其他元素如h1的左边缘，会从0开始计算，需要进行平滑处理，当然使用clientX不会有这种问题

### 补充

1. 在标签上写上contenteditable 意为该标签文本可编辑
2. offsetX和clientX区别:offsetX只是计算当前点击元素的位置,pageX计算到文档的位置，clientX只计算当前页面的位置（不受滚动条影响）![img](https://img-blog.csdn.net/20150502094344891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbHpkaW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

3. text-shadow支持添加多个阴影

```js
text.style.textShadow=`${xR}px ${yR}px 0 rgba(255, 78, 0,1),
                          ${yR}px ${xR}px 0 rgba(255, 0, 209,1)`;
```

