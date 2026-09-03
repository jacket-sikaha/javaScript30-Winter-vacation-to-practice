## 15 - LocalStorage餐厅点菜

### 介绍

- 通过输入框为上面列表添加自定义新菜品，也支持修改菜品的状态，同时采用LocalStorage存储数据，再次打开浏览器也能查看上次数据

### 设计思路

1. 需要一个全局作用域的数组负责数据的添加修改，因为数组方法很多
2. 读取输入框的值，先处理成对象（一个菜品对象里有两个属性：是否选中状态isSelect和菜名name）
3. 添加数据：将对象push到数组里，接着将数组存储在LocalStorage里最后调用显示数据的方法重新渲染页面
4. 显示数据，读取数组里的数据，map方法转换成HTML的格式，更新列表里的样式
5. 修改状态，多选列表里的数据发生改变LocalStorage里的数据也得改变：input标签上的id属性与数组索引一一对应，因此可以直接确定目标元素的位置并修改其属性，最后将新数组覆盖LocalStorage的旧数组

### 说明

1. [input标签的required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)可以在提交时检测，避免提交空值
2. LocalStorage里的数据存储一个对象要使用JSON格式
3. [Window.localStorage操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)，理解与sessionStorage区别
4. 开发者工具查看<img src="C:\Users\98755\Desktop\pj\es6\JS练手\mypj\15 - LocalStorage餐厅点菜\img.png" alt="LocalStorage内容" style="zoom:75%;" />

