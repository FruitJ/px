// 封装图片穿墙模块
let picThroughWallModule = (function () {

    // 获取目标元素
    let root = document.querySelector("#container"),
        ul = root.querySelector("ul"),
        oLis = [...ul.querySelectorAll("li")],
        p = root.querySelectorAll("p");

    // 封装 offset 方法
    let offset = function offset(ele) {
        let parent = ele.offsetParent,
            top = ele.offsetTop,
            left = ele.offsetLeft;
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

    let _getData = function _getData(ele, ev) {
        // 获取 li 上下左右的阈值
        let top = offset(ele).top,
            left = offset(ele).left,
            right = left + ele.offsetWidth,
            bottom = top + ele.offsetHeight;
        // 获取鼠标的偏移值
        let x = ev.pageX,
            y = ev.pageY;
        return {
            min_t: Math.abs(y - top),
            min_b: Math.abs(y - bottom),
            min_l: Math.abs(x - left),
            min_r: Math.abs(x - right),
        };
    };
    let _change = function _change(l, t, item) {
        item.style.transitionDuration = `0s`;
        item.style.left = `${l}px`;
        item.style.top = `${t}px`;
        item.offsetTop;
        item.style.transition = `all .5s ease 0s`;
        item.style.left = `0`;
        item.style.top = `0`;
    };
    // 事件绑定
    let _bindEventToView = function _bindEventToView() {
        let timer = null;
        oLis.forEach((item, index) => {
            item.addEventListener('mouseenter', function (ev) {
                p[index].style.top = `-${408}px`;
                ev = ev || window.event;
                ev.target = ev.target || ev.srcElement;

                let source = _getData(item, ev);
                let { min_t, min_b, min_l, min_r } = source;
                let min = Math.min(min_t, min_b, min_l, min_r);

                let pos_l = 0;
                let pos_t = 0;
                switch (min) {
                    case min_t: // 上
                        pos_l = 0;
                        pos_t = -408;
                        break;
                    case min_b: // 下
                        pos_l = 0;
                        pos_t = 408;
                        break;
                    case min_l: // 左
                        pos_l = -230;
                        pos_t = 0;
                        break;
                    case min_r: // 右
                        pos_l = 230;
                        pos_t = 0;
                        break;
                }
                _change(pos_l, pos_t, p[index]);
            }, false);

            item.addEventListener('mouseleave', function (ev) {
                ev = ev || window.event;
                ev.target = ev.target || ev.srcElement;
                let source = _getData(item, ev);
                let { min_t, min_b, min_l, min_r } = source;
                let min = Math.min(min_t, min_b, min_l, min_r);
                switch (min) {
                    case min_t: // 上
                        p[index].style.top = `${-408}px`;
                        break;
                    case min_b: // 下
                        p[index].style.top = `${408}px`;
                        break;
                    case min_l: // 左
                        p[index].style.left = `${-230}px`;
                        break;
                    case min_r: // 右
                        p[index].style.left = `${230}px`;
                        break;
                }
                clearTimeout(timer);
                timer = setTimeout(() => {
                    p[index].style.top = `${-408}px`;
                    p[index].style.transitionDuration = `0s`;
                }, 500);
            }, false);
        });

    };
    return {
        init() {
            _bindEventToView();
        },
    };
})();
picThroughWallModule.init();