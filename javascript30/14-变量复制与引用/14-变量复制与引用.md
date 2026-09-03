## 14 - JavaScript变量的复制和引用

### 介绍

- 了解变量的复制，对象的深，浅拷贝

### 说明

1. 基本数据类型拷贝：变量名就是地址，地址指向值；因此a拷贝某个变量b=2，a = b  => 2，a的地址就指向2，修改a的值不会改变b的值
2. 引用数据类型拷贝：

```js
//赋值引用  两个数组指向同一份数据
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    let team =players;
    // team[0]=1;
    console.log('players',players);
    // console.log(team); //['1', 'Sarah', 'Ryan', 'Poppy']
```

3. 数组浅拷贝：避免第二种赋值拷贝造成修改同一数据

   1. splice方法，不传参数默认从0开始复制整个数组
   2. Array.from()
   3. ES6 扩展运算符 let t4=[...players];
   4. [concat方法](https://www.w3school.com.cn/jsref/jsref_concat_array.asp)连接数组

4. 对象浅拷贝

   1. [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)方法（重复的键新的会覆盖旧的键）
   2. ES6扩展运算符let de3 = {...person};

5. 深拷贝：对于对象里还有引用数据类型嵌套的情况下进行浅拷贝，第二层之后的引用类型对象依然指向同一块内存空间

   1. JSON方法（ 缺点不能复制函数对象，正则表达式RegExp对象 ,原型链会断掉指向Object）
   2. 遍历对键值一个个赋值

   

