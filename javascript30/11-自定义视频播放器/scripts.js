let video =document.querySelector('.viewer');
let playcontrol = document.querySelector('.toggle');
let progress = document.querySelector('.progress__filled');
let ranges = document.querySelectorAll('input[type="range"]');
let buttonmove = document.querySelectorAll('.player__button');


function play() {
    if (video.paused){
        playcontrol.innerHTML="❚ ❚";
        video.play();
    }else{
        video.pause();
        playcontrol.innerHTML="►";
    }
}

function progressrun() {
    progress.style.flexBasis = `${video.currentTime/video.duration*100}%`;
}

function skip(event) {
    video.currentTime = event.offsetX / 750*video.duration;
}

function dragmove(event) {
    video.currentTime = event.offsetX / 750*video.duration;
}

function changevio() {
    video[this.name]=this.value;
}

function clickmove() {
    video.currentTime+=Number(this.dataset.skip);
}

//点击视频界面暂停播放
video.addEventListener('click',play);
//点击视频暂停键控制播放
playcontrol.addEventListener('click',play);
//视频播放时间监听绑定滚动条动画
video.addEventListener('timeupdate',progressrun);

let isDrag=false;
// 点击跳转
progress.parentElement.addEventListener('click',skip);
//拖动跳转  mousemove监听鼠标移动位置变化  isDrag判断是否满足拖拽情况  &&前面满足条件才继续执行右边
progress.parentElement.addEventListener('mouseup',() => isDrag =false);
progress.parentElement.addEventListener('mousedown',() => isDrag =true);
//别忘了传参event
progress.parentElement.addEventListener('mousemove',(event) =>isDrag && dragmove(event));

//其他按钮控制视频音量 播放速度  快进秒数
ranges.forEach(range => range.addEventListener('change',changevio));
ranges.forEach(range => range.addEventListener('mousemove',changevio));
buttonmove.forEach(button => button.addEventListener('click',clickmove));

