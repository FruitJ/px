// 轮播图 jQuery 版本
/*
    水平运动轮播图需求分析 : 
    1. 实现自动轮播
    2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
    3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
    4. 实现手动轮播
        -1). 左右按钮
        -2). 焦点切换
*/

// 0. 获取所需 dom 元素以及预设需要使用到的变量
let $container = $(".container"), // 视口容器
    $wrapper = $(".wrapper"), // 移动舞台
    $sliderList = $(".slider"), // 滑块们
    $pagenitionList = $(".pagenition li"), // 分页器的小圆点
    $changeLeft = $(".changeLeft"), // 左按钮
    $changeRight = $(".changeRight"); // 右按钮
let timer = null,
    len = $sliderList.length,
    index = 0;
const WIDTH = $container.width(),
    INTERVAL = 2000;
// 1. 实现自动轮播
function move() {
    if (index >= len - 1) {
        index = 0;
        changeStyle(false);
        $container.height();
    }
    index++;
    changeStyle();
    flollow();
}
timer = setInterval(move, INTERVAL);
// 2. 鼠标移动到视口范围内, 轮播图停止, 移出则轮播图继续
$container.on('mouseenter', () => clearInterval(timer)).on('mouseleave', () => timer = setInterval(move, INTERVAL));

// 3. 分页器的小圆点(焦点)跟着轮播(手动/自动)图动起来
function flollow() {
    $pagenitionList.each((num, ele) => {
        if (num === index || (num === 0 && index === len - 1)) {
            $(ele).addClass("active");
            return;
        }
        $(ele).removeClass("active");

    });
}
// 4. 实现手动轮播
//     -1). 左右按钮
$changeRight.on('click', move);
$changeLeft.on('click', () => {
    if (index === 0) {
        index = len - 1;
        changeStyle(false);
        $wrapper.height();
    }
    index--;
    changeStyle();
    flollow();
});
//     -2). 焦点切换
$pagenitionList.on('click', function () {
    let num = $(this).index();
    if (index === num || (num === 0 && index === len - 1)) return;
    index = num;
    changeStyle();
    flollow();
});
function changeStyle(tag = true) {
    $wrapper.css({
        left: `-${index * WIDTH}px`,
        transition: tag ? `all 0.3s ease 0s` : `none`,
    });
}