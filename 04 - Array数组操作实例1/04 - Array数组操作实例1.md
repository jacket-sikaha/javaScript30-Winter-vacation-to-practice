## 04 - Array数组操作实例1 

### 介绍

* 熟悉数组的filter，map  , sort , reduce操作

### 说明

- 数组的sort机制类似java的 Arrays.sort，可以使用自己的比较机制
- map是对数组元素进行调整，修改得到新数组
- filter是得到符合要求的元素数组，与find，some的区别是只寻找符合要求的元素，找到则会退出遍历。
- reduce则是对数组元素进行运算
- [字符串比较机制](https://blog.csdn.net/Mrs_chens/article/details/102863896)
- ES6语法：字符串模板和模式匹配赋值
- 统计数组各元素里的重复次数  
  - 传入一个空对象，obj负责接收{}
  - 遍历过程如果obj没有当前值item这个键就进行初始化
  - 不断遍历计算得出结果对象

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
    const transportation = data.reduce(function(obj, item) {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});
```

### 参考API

- [W3c Array](https://www.w3school.com.cn/jsref/jsref_obj_array.asp)