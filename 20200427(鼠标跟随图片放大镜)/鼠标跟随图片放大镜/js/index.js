// 获取元素
let root = document.querySelector("#root"),
    content = root.querySelector(".content"),
    mask = content.querySelector(".mask"),
    scaleContent = root.querySelector(".scale-content"),
    scaleContentImg = scaleContent.querySelector("img");

let content_l = content.offsetLeft, // 小盒子左偏移
    content_t = content.offsetTop, // 小盒子上偏移
    content_w = content.offsetWidth, // 小盒子宽度
    content_h = content.offsetHeight, // 小盒子高度
    mask_w = mask.offsetWidth, // 遮罩层宽度
    mask_h = mask.offsetHeight, // 遮罩层高度
    minLeft = 0, // 遮罩层水平移动的最小阈值
    minTop = 0, // 遮罩层垂直移动的最小阈值
    maxLeft = content_w - mask_w, // 遮罩层水平移动的最大阈值
    maxTop = content_h - mask_h, // 遮罩层垂直移动的最大阈值
    proportion_w = scaleContent.offsetWidth / content.offsetWidth, // 大盒子与小盒子宽度比例
    proportion_h = scaleContent.offsetHeight / content.offsetWidth; // 大盒子与小盒子高度比例

content.addEventListener('mousemove', function (ev) {
    ev = ev || window.event;
    let x = ev.clientX; // 实时获取鼠标水平偏移
    let y = ev.clientY; // 实时获取鼠标垂直偏移
    x -= content_l + mask_w / 2; // 实时获取鼠标在小盒子内水平偏移
    y -= content_t + mask_h / 2; // 实时获取鼠标在小盒子内垂直偏移
    // 移动遮罩层
    mask.style.cssText = `
        top: ${ y}px;
        left: ${ x}px;
    `;
    // 遮罩层边界处理
    if (x <= minLeft) {
        mask.style.left = `${minLeft}px`;
    }
    if (x >= maxLeft) {
        mask.style.left = `${maxLeft}px`;
    }
    if (y <= minTop) {
        mask.style.top = `${minTop}px`;
    }
    if (y >= maxTop) {
        mask.style.top = `${maxTop}px`;
    }
    // 根据比例反向移动大盒子中的图片
    scaleContentImg.style.cssText = `
        top: -${y * proportion_h}px;
        left: -${x * proportion_w}px;
    `;
}, false);