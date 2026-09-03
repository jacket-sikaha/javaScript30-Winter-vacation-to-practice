## 开发小技巧.html

### 说明

1. 警告输出console.**warn**('OH NOOO');
2. 错误输出console.**error**('Shit!');
3. 信息输出console.**info**('Crocodiles eat 3-4 people per year');
4. 表格输出console.**table**(dogs);
5. 组合输出

```js
// Grouping together
    dogs.forEach(dog => {
        console.groupCollapsed(`${dog.name}`);//必须，起始点，输出组合名字可以自定义
        console.log(`This is ${dog.name}`);
        console.log(`${dog.name} is ${dog.age} years old`);
        console.log(`${dog.name} is ${dog.age * 7} dog years old`);
        console.groupEnd(`${dog.name}`);//必须，结束点 groupCollapsed已经定义了名字，这里就可以不需要再写了
    });
```



1. 计数输出

```js
console.count('Steve');
    console.count('Wes');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
```

6. 查看DOM元素属性console.**dir**(p);
7. 断言测试console.**assert**(p.classList.contains('ouch'), 'That is wrong!');
8. 测试程序执行时间time与timeEnd

```js
console.time('fetching data');
    fetch('https://api.github.com/users/wesbos')
        .then(data => data.json())
        .then(data => {
            console.timeEnd('fetching data');
            console.log(data);
        });
```

9. 清空控制台console.**clear**();