## 22 - Follow Along Link Highlighter导航跟随

### 介绍

- 鼠标触碰某些关键词区域，会有相应的跟随效果

### 设计思路

1. 核心思路：只设计一个span样式去移动到关键词位置，就有这种跟随效果
2. 鼠标触碰某些关键词区域触发事件，使用mouseenter
3. 获取目标元素的位置，宽高
4. 根据触发元素的不同，改变相应的位置，宽高，达到跟随，覆盖的效果

### 补充

1. 获取目标元素的位置，宽高的第二种写法

```js
 //模板匹配写法需要对参数进行运算再赋值的建议以下写法
      const linkCoords = this.getBoundingClientRect(); //获取该元素的相对于当前视图窗口的位置信息，自身宽高度
      const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
      //采用第二种写法translate作用于整个页面，向下滚动后与上面距离减小，导致span位置发生变化
      //因此得加上水平，垂直滚动的距离，减少滚动对getBoundingClientRect获取的数值影响
      };
highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
```

2. 我自己是通过offsetTop来获取位置的，因此只相对于父元素而言，对于毫无关系的元素不会计算其中，因此我们需要考虑其他元素的影响，譬如现在获取的数值是距离div的上边缘位置，但因为该div之上还有有导航栏占据，少计算了这部分导致span上移

3. 本题要求span位置精确定位，所以从元素自身获取位置更可靠

   