/*
    水平运动轮播图需求分析 : 
    1. 实现自动轮播
    2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
    3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
    4. 实现手动轮播
        -1). 左右按钮
        -2). 焦点切换
*/

// 0. 获取目标元素以及预设所需变量
let container = document.querySelector(".container"), // 视口容器
    wrapper = document.querySelector(".wrapper"), // 移动舞台
    sliderList = wrapper.querySelectorAll(".slider"), // 滑块们
    pagenitionList = container.querySelectorAll(".pagenition li"), // 分页器的小圆点
    changeLeft = document.querySelector(".changeLeft"), // 左按钮
    changeRight = document.querySelector(".changeRight"); // 右按钮

let timer = null,
    len = sliderList.length,
    index = 0;
const WIDTH = container.offsetWidth,
    INTERVAL = 2000;

// 1. 实现自动轮播
function move() {
    if (index >= len - 1) {
        index = 0;
        changeStyle(false);
        container.offsetWidth;
    }
    index++;
    changeStyle();
    follow();
}
timer = setInterval(move, INTERVAL);
// 2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续(鼠标移入事件 -> onmouseenter; 鼠标移出事件 -> onmouseleave)
container.addEventListener('mouseenter', function () {
    clearInterval(timer);
}, false);
container.addEventListener('mouseleave', function () {
    timer = setInterval(move, INTERVAL);
}, false);

// 3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
function follow() {
    [...pagenitionList].forEach((ele, num) => {

        if (num === index || (num === 0 && index === len - 1)) {
            ele.className = "active";
            return;
        }
        ele.className = "";
    });
}
// 4. 实现手动轮播
//     -1). 左右按钮
changeRight.addEventListener('click', move, false);
changeLeft.addEventListener('click', function () {
    if (index === 0) {
        index = len - 1;
        changeStyle(false);
        container.offsetWidth;
    }
    index--;
    changeStyle();
    follow();
}, false);
//     -2). 焦点切换
[...pagenitionList].forEach((ele, num) => {
    ele.addEventListener('click', function () {
        if (num === index || (num === 0 && index === len - 1)) return;
        index = num;
        changeStyle();
        follow();
    }, false);
});
// 工具函数
function changeStyle(tag = true) {
    if(tag) {

        wrapper.style.transition = `all 0.3s ease 0s`;
    }else {
        wrapper.style.transition = `none`;
    }
    wrapper.style.left = `-${index * WIDTH}px`;
}