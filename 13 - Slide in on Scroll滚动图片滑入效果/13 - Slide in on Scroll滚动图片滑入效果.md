### 13 - Slide in on Scroll滚动图片滑入效果

### 介绍

- 鼠标滚轮滑动页面，图片会根据高度变化有滑入滑出的效果

### 设计思路

1. 首先得获取到当前的页尾位置,所以window.scrollY就是页首位置

```js
//滚动高度 + 当前页面高度 = 实际页尾位置
        let  scrollLength = window.scrollY + window.innerHeight ;
```

2. 自己定义图片的判断区域（区域选的越小，判断就越敏感），譬如图片的上1/4是滑入（页尾准备进入图片3/4的部分），下1/4则是滑出（页首要超出图片3/4的部分），所以在这段范围之内的所有图片都必须遍历查验是否符合条件，在范围内就滑入，在范围外就滑出

```js
// 图片头部对于整个页面头部的位置offsetTop
        // 图片头部判定位置
        let top = item.offsetTop + item.offsetHeight/4;
        //图片底部判定位置
        let bottom = item.offsetTop + item.offsetHeight/4*3;
        scrollLength>top && window.scrollY<bottom ? item.classList.add('active'):item.classList.remove('active');
```

3. 确定订阅事件scroll,每次事件触发都进行遍历检测，导致图片越多越容易卡顿，有待优化

### 补充

```css
*, *:before, *:after {
      /*使得元素获取其父元素的计算值。它可以应用于任何CSS属性，包括CSS简写 all。*/
      /*对于继承属性，inherit 关键字只是增强了属性的默认行为，通常只在覆盖原有的值的时候使用。*/
      box-sizing: inherit;
    }
```



