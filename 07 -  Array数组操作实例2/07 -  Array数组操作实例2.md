### 07 -  Array数组操作实例2

### 介绍

- 熟悉数组的find，some的作用与区别，删除splice方法，截取方法slice

### 说明

1. [find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  (findIndex方法恰恰是返回该元素的索引)
2. [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
3. [splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

```js
//splice删除 添加元素 array.splice(index, howmany, item1, ....., itemX)
    // index 删除/添加位置  howmany 删除个数    item1 添加元素
```

4. 删除数组第二种方式，使用截取方法slice去除目标元素，再将两个数组拼合在一起，需要采用扩展运算符（能将「数组」转换为逗号分隔的‘参数序列’）