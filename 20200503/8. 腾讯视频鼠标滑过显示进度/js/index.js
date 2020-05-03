// 封装鼠标滑过显示进度图片模块
let silderModule = (function () {

    // 获取目标元素
    let root = document.querySelector("#container"),
        screen = root.querySelector("#content"),
        img = screen.querySelector("img"),
        slider = root.querySelector(".slider"),
        data = [];

    let offset = function offset(ele) {
        let parent = ele.offsetParent,
            left = ele.offsetLeft,
            top = ele.offsetTop;
        while (parent !== document.body) {
            if (/MSIE 8/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            top,
            left,
        };
    };

    // 获取数据
    let _getData = function _getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../resource/data.json', false);
        xhr.addEventListener('readystatechange', function () {
            data = JSON.parse(xhr.responseText);
        }, false);
        xhr.send(null);
    };

    // 渲染视图
    let _render = function _render() {
        // 初始化
        img.src = data.init;
        slider.style.width = 0;
    };

    // 事件绑定
    let _bindEventToView = function () {
        const IMG_LIST = data.progress.length; // 获取视频图片切片数量
        let l = offset(screen).left; // 获取 .screen 的水平偏移
        let t = offset(screen).top; // 获取 .screen 的垂直偏移
        let len = screen.offsetWidth,
            step = len / IMG_LIST,
            cur_x = 0,
            cur_y = 0;
        screen.addEventListener('mouseenter', function (ev) {
            cur_y = Math.abs(ev.pageY - t);
            img.src = data.in;
        }, false);
        screen.addEventListener('mousemove', function (ev) {
            ev = ev || window.event;
            cur_x = Math.abs(ev.pageX - l);
            cur_y = Math.abs(ev.pageY - t);
            slider.style.width = `${cur_x}px`;
            img.src = data.progress[Math.floor(cur_x / step)];
        }, false);
        screen.addEventListener('mouseleave', function () {
            img.src = data.init;
            slider.style.width = `${0}px`;
        }, false);

    };

    return {
        init() {
            _getData();
            _render();
            _bindEventToView();
        },
    };
})();
silderModule.init();