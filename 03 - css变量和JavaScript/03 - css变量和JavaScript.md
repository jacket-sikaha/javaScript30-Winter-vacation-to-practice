## 03 - css变量和JavaScript

### 介绍

​		调节滚动条改变图片的样式，图片的内边距，模糊度，背景颜色

### 设计思路 

1. 确定监听事件------change（针对form表单input的数据变化）
2. 利用name属性区分要修改的属性
3. 图片修改属性之间的对应

```javascript
 if (this.name==="spacing"){
      img.style.padding=`${this.value}px`;
    }
    else if (this.name==="blur"){
      img.style.filter= `blur(${this.value}px)`;
    }
    else {
      img.style.background=`${this.value}`;
      span.style.color=`${this.value}`;
    }
```

### 注意事项

1. change事件只会在input的值发生改变才触发，因此鼠标还在拖动的时刻图片不会有变化

### 优化补充第二种做法---好处是省去了判断变量的过程

1. css变量设置---将input的name与变量属性直接绑定

```css
 	/*root伪类定义全局变量*/
    :root{
        --spacing: 10px;
        --blur: blur(10px);
        --base: #ffc600 ;
    }
```

2. 使用css变量设置样式

```html
  /*注意带单位的变量要 设置自定义属性（后缀）  data-变量名*/
<label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
```

```css
	img{
        padding: var( --spacing);
        filter: var( --blur);
        background:var( --base) ;
    }
```

3. js修改属性

``` js
 function handUpdate(){
        // console.log(this.dataset)
        // 访问自定义变量属性
        let suffix= this.dataset.sizing || '';
        document.documentElement.style.setProperty(`-	-${this.name}`,this.value+suffix);
    }
```

