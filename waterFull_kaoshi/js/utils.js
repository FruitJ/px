// 封装 utils 模块
let utils = (function () {

    // _getCss
    let _getCss = function _getCss(element, attr) {

        // 获取对应属性值
        let val = window.getComputedStyle(element, null)[attr];
        // 定义增则
        let reg = /^\d+(px|em|rem)$/;
        if (reg.test(val)) {
            val = Number.parseFloat(val);
        }
        return val;
    };

    // _setCss
    let _setCss = function _setCss(element, attr, val) {

        // 处理 opacity 的兼容性
        if (attr === "opacity") {
            element.style[attr] = val;
            element.style['filter'] = `alpha(opacity=${val * 100})`;
            return;
        }
        // 定义正则
        let reg = /^(width|height|margin|padding)?(top|left|right|bottom)?$/;
        if (reg.test(attr)) {
            val += 'px';
        }
        element.style[attr] = val;
    };

    // _setGroupCSS
    let _setGroupCSS = function _setGroupCSS(element, arg) {

        for (let key in arg) {
            if (!arg.hasOwnProperty(key)) return;
            _setCss(element, key, arg[key]);
        }
    };

    // cee
    let css = function css(element) {

        const { length: len } = arguments,
            attr = arguments[1],
            val = arguments[2],
            type = typeof attr;
        if (len >= 3) {
            _setCss(element, attr, val);
            return;
        } else if (type === "object" && type !== "null") {
            _setGroupCSS(element, attr);
            return;
        }

        return _getCss(element, attr);
    };

    // offset
    let offset = function offset(element) {

        let parent = element.offsetParent,
            left = element.offsetLeft,
            top = element.offsetTop;
        while (parent !== document.body) {

            if (/MSIE 8/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent += parent.offsetParent;
        }
        return {
            top,
            left,
        };
    };

    return { // 暴露接口
        css,
        offset,
    };
})();