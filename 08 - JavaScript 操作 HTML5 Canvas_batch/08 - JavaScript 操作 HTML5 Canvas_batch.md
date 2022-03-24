## 08 - JavaScript 操作 HTML5 Canvas_batch

### 介绍 

- 利用Canvas做一个彩色笔触画板

### 设计思路

1. [canvas初始化](https://www.runoob.com/html/html5-canvas.html)

   1. 找到canvas元素对象
   2. 设置画板的宽高，位置
   3. 设置画笔的粗细，颜色，线条的风格

   ```js
    //canvas初始化
     const canvas = document.querySelector('#draw');
     canvas.width= window.innerWidth;
     canvas.height= window.innerHeight;
     let context = canvas.getContext('2d');
     context.lineCap="round";
     context.lineJoin="round";
     context.lineWidth=30;
   ```

2. 理解绘制图形的过程------[使用canvas来绘制图形](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
3. 模拟绘画软件确定订阅事件：mousedown按下鼠标记录初始位置和表示开始画画，接着mousemove鼠标移动才能开始不断画画，直到mouseup鼠标松开才停止。

### 补充

1. 每次移动初始位置也需要更新，也就是每次滑动初始点都是终点，终即始，因此在线条宽度低情况下画出来的效果就是一串串点
2. 增添细节，鼠标移出画板事件mouseout判断画画完成
3. 线条移动的粗细变化：设置一个变量width去控制，当线条宽于某值就减小 ，反正细于某值就增大

```js
 //粗细变化
    if (context.lineWidth>=100 || context.lineWidth<=1) width=!width;
    width? context.lineWidth-- :context.lineWidth++;
```

4. 颜色变化：了解[hsl颜色](https://www.w3school.com.cn/css/css_colors_hsl.asp)，不断移动不断修改其属性（比如一直增加），能改变颜色的第一个参数范围是0-359，因此超过这个范围我们需要令其归零

```js
 context.strokeStyle=`hsl(${hue}, 100%, 50%)`;
 //颜色变化
    if (hue>359)hue=0;
    hue++;
```



