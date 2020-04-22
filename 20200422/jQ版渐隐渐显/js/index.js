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
let $container = $(".container"),
    $wrapper = $(".wrapper"),
    $sliderList = $(".slide"),
    $paginationList = $(".pagination li"),
    $changeLeft = $(".changeLeft"),
    $changeRight = $(".changeRight");

let timer = null,
    len = $sliderList.length,
    current = 0,
    prev = 0;

const INTERVAL = 2000;

// 1. 实现自动轮播
function change() {
    $sliderList.eq(current).css("z-index", 1);
    $sliderList.eq(prev).css("z-index", 0);
    $sliderList.eq(current).css("opacity", 1);
    $sliderList.eq(prev).css("opacity", 0);
}
function autoMove() {
    prev = current;
    current++;
    if (current > len - 1) {
        current = 0;
    }
    change();
    follow();
}
timer = setInterval(autoMove, INTERVAL);
// 2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
$container.on('mouseenter', () => {
    clearInterval(timer);
}).on('mouseleave', () => {
    timer = setInterval(autoMove, INTERVAL);
});

// 3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
function follow() {
    $paginationList.eq(current).addClass("active").siblings().removeClass("active");
}
// 4. 实现手动轮播
//     -1). 左右按钮
$changeRight.on('click', autoMove);
$changeLeft.on('click', () => {
    prev = current;
    current--;
    if (current < 0) {
        current = len - 1;
    }
    change();
    follow();
});
//     -2). 焦点切换
$paginationList.on('click', function () {
    let index = $(this).index();
    if (current === index) return;
    prev = current;
    current = index;
    change();
    follow();
});