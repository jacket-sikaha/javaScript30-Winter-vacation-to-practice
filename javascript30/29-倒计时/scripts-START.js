
let timeleft = document.querySelector('.display__time-left');
let endtime = document.querySelector('.display__end-time');
let timebutton = document.querySelectorAll('.timer__button');
let diyMin = document.querySelector('#custom');
let countID;


// function setButtontime(event) {
//     clearInterval(countID);
//     let inputTime;
//     if (!enterTime){
//         inputTime=this.dataset.time;
//     }else {
//     inputTime=parseInt(enterTime)*60;
//     enterTime='';
//     }
//     let time = new Date( Date.now() + inputTime*1000);
//     let countTime = new Date( inputTime*1000);
//     endtime.innerHTML=`<p class="display__end-time">
//                       在 ${time.toLocaleTimeString()} 结束</p>`;
//     timeleft.innerHTML=`<h1 class="display__time-left">
//                     ${Math.floor(inputTime/60)}:${inputTime%60}
//                     </h1>`;
//     countID=setInterval(()=>{
//         if (inputTime>0){
//             inputTime--;//系统有可能为了优化运行会暂停执行
//             timeleft.innerHTML=`<h1 class="display__time-left">
//                     ${Math.floor(inputTime/60)}:${inputTime%60}
//                     </h1>`;
//         }
//         else {clearInterval(countID);return;} console.log(inputTime)
//     },1000);
// }
// function inputMin(event) {
//     event.preventDefault()
//     enterTime=this.querySelector('input').value;
//     setButtontime();
//     this.querySelector('input').value='';
// }
function timer(sec) {
    //开启新一段计时前得去除上一个计时器
    clearInterval(countID);

    let now = Date.now();
    let then = now + sec * 1000;

    showEndTime(then);
    //触发的延迟问题会让计时面板无法显示初始倒数时刻，所以提前显示
    showCountTime(sec);
    countID=setInterval(()=>{
            let countTime = Math.round((then - Date.now())/1000);
            console.log(countTime)
            if (countTime <= 0){
                clearInterval(countID);
            }
            showCountTime(countTime);
        },1000);
}

function showEndTime(endTime) {
    let end = new Date(endTime);
    endtime.textContent="在 "+end.toLocaleTimeString()+" 停止";
}

function showCountTime(countTime) {
    let min = Math.floor(countTime/60);
    let sec = countTime%60;
    timeleft.textContent=`${min}:${sec<10?"0"+sec:sec}`;
}

function startTimer() {
    timer(this.dataset.time);
}

function inputMin(event) {
    event.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
}
timebutton.forEach(button => button.addEventListener('click',startTimer));
diyMin.addEventListener('submit',inputMin);

//获取自定义表单第二种方式
// 事件监听采用箭头函数写法输出的this是window所以建议使用一般写法
//箭头函数的this指向是在其函数声明的作用域的对象，document.customForm指向window
// document.customForm.addEventListener('submit',function(e){
//     e.preventDefault();
//     const mins = this.minutes.value;
//     console.log(this);
//     timer(mins * 60);
//     this.reset();
// });


