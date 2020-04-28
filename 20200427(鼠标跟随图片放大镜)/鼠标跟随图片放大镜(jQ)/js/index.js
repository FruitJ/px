// 获取元素
let $root = $("#root"),
    $content = $(".content", $root),
    $contentImg = $("img", $content);
$mask = $(".mask", $content),
    $scaleContent = $(".scale-content", $root),
    $scaleContentImg = $("img", $scaleContent),
    $corridorImgs = $(".corridor", $root).find("img");

let content_l = $content.offset().left, // 小盒子左偏移
    content_t = $content.offset().top, // 小盒子上偏移
    content_w = $content.outerWidth(), // 小盒子宽度
    content_h = $content.outerHeight(), // 小盒子高度
    mask_w = $mask.outerWidth(), // 遮罩层宽度
    mask_h = $mask.outerHeight(), // 遮罩层高度
    minLeft = 0, // 遮罩层水平移动的最小阈值
    minTop = 0, // 遮罩层垂直移动的最小阈值
    maxLeft = content_w - mask_w, // 遮罩层水平移动的最大阈值
    maxTop = content_h - mask_h, // 遮罩层垂直移动的最大阈值
    proportion_w = $scaleContent.outerWidth() / $content.outerWidth(), // 大盒子与小盒子宽度比例
    proportion_h = $scaleContent.outerHeight() / $content.outerHeight(); // 大盒子与小盒子高度比例
let prev = null;
selector($corridorImgs.eq(0), 0); // 初始状态
$content.on('mousemove', function (ev) {
    let x = ev.pageX; // 实时获取鼠标水平偏移
    let y = ev.pageY; // 实时获取鼠标垂直偏移
    x -= content_l + mask_w / 2; // 实时获取鼠标在小盒子内水平偏移
    y -= content_t + mask_h / 2; // 实时获取鼠标在小盒子内垂直偏移
    // 移动遮罩层
    $mask.css({
        opacity: "1",
        top: y,
        left: x,
    });

    // 遮罩层边界处理
    if (x <= minLeft) {
        $mask.css("left", minLeft);
    }
    if (x >= maxLeft) {
        $mask.css("left", maxLeft);
    }
    if (y <= minTop) {
        $mask.css("top", minTop);
    }
    if (y >= maxTop) {
        $mask.css("top", maxTop);
    }
    // 根据比例反向移动大盒子中的图片
    $scaleContentImg.css({
        top: -(y * proportion_h),
        left: -(x * proportion_w),
    });
});
$content.mouseover(function() {
    $scaleContent.css("opacity", 1);
    $mask.css("opacity", 1);
});
$content.mouseout(function() {
    $mask.css("opacity", 0);
    $scaleContent.css("opacity", 0);
});
$corridorImgs.each((index, item) => {
    $(item).on('click', function() {
        selector($(this), index);
    });
});

function selector(ele, index) {
   
    if (prev !== null) prev.css("borderColor", "#EEE");
    ele.css("borderColor", "gray");
    // 获取索引
    $contentImg.get(0).src = `../img/qsmy-small-${index + 1}.jpg`;
    $scaleContentImg.get(0).src = `../img/qsmy-big-${index + 1}.jpg`;
    prev = ele;
}