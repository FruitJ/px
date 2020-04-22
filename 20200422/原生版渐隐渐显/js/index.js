/*
    水平运动轮播图需求分析 : 
    1. 实现自动轮播
    2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
    3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
    4. 实现手动轮播
        -1). 左右按钮
        -2). 焦点切换
*/

// 水平运动轮播图需求分析 : 
// 0. 获取所需 dom 元素以及预设需要使用到的变量
let container = document.querySelector(".container"),
    wrapper = container.querySelector(".wrapper"),
    sliderList = wrapper.querySelectorAll(".slide"),
    paginationList = container.querySelectorAll(".pagination li"),
    changeLeft = container.querySelector(".changeLeft"),
    changeRight = container.querySelector(".changeRight");

let timer = null,
    len = sliderList.length,
    current = 0,
    prev = 0;

const INTERVAL = 2000;
// 1. 实现自动轮播

function change() {
    sliderList[current].style.cssText = `
        z-index: 1;
        opacity: 1;
    `;

    sliderList[prev].style.cssText = `
        z-index: 0;
        opacity: 0;
    `;
    follow();
}
function autoMove() {

    prev = current;
    current++;
    if (current > len - 1) {
        current = 0;
    }
    change();
}
timer = setInterval(autoMove, INTERVAL);
// 2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
container.addEventListener('mouseenter', function () {
    clearInterval(timer);
}, false);
container.addEventListener('mouseleave', function () {
    timer = setInterval(autoMove, INTERVAL);
}, false);
// 3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
function follow() {
    [...paginationList].forEach((item, index) => {

        if (index === current) {

            item.className = "active";
            return;
        }
        item.className = '';
    });
}

// 4. 实现手动轮播
//     -1). 左右按钮
console.log(changeLeft);

changeRight.addEventListener('click', autoMove, false);
changeLeft.addEventListener('click', function () {
    prev = current;
    current--;
    if (current < 0) {
        current = len - 1;
    }
    change();
}, false);
//     -2). 焦点切换
[...paginationList].forEach((item, index) => {
    item.addEventListener('click', function () {
        if (index === current) return;
        prev = current;
        current = index;
        change();
    }, false);
});