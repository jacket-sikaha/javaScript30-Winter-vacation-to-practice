## 24 - Sticky Nav会吸附的导航

### 介绍

- 随滚动条向下滚动，导航栏会跟一直吸附在顶部

### 设计思路

1. 控制吸附的DOM属性是 position: fixed

```css
.fixed-nav nav{
  /*钉死位置  原来的流式布局会忽略（抽掉）元素的高度，
  导致该元素会与下面元素距离缩短，需要将下元素间距弥补缺失高度*/
  position: fixed;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
```

2. 监听scroll事件，当垂直滚动条window.scrollY超过导航栏的上边缘间距时（页首到达导航栏上边的位置），就修改样式进行吸附
3. 解决position的抖动问题：需要在导航栏下的div节点或者body对象额外加上缺失的导航栏高度

```js
if (window.scrollY>=start ) {
     document.body.classList.add('fixed-nav')
     // logo.style.maxWidth=200+'px';//采用样式的方式就控制父选择器即可
     document.body.style.paddingTop=head.offsetHeight+'px';
    }else {

     document.body.style.paddingTop=0;
     document.body.classList.remove('fixed-nav');
   }
```

