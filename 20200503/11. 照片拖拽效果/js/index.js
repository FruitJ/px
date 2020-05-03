// 封装拖拽模块
let dragModule = (function () {

    // 获取目标元素
    let root = document.querySelector("#container"),
        data = [];

    // 获取数据
    let _getData = function _getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../resource/data.json', false);
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }, false);
        xhr.send(null);
    };

    // 渲染视图
    let _render = function _render() {
        let str = ``;
        data.pics.forEach((item, index) => {
            str += `
            <div draggable="true">
            <img src="${ item}" alt="">
            </div>
            `;
        });
        root.innerHTML = str;
        let oDivs = [...root.querySelectorAll("div")];
        let pos = [];
        oDivs.forEach((item, index) => { // 获取相对定位时的 左/上 偏移值
            pos.push({
                top: item.offsetTop,
                left: item.offsetLeft,
            });
        });
        for (let i = 0; i < oDivs.length; i++) { // 使用绝对定位重新布局
            oDivs[i].style.cssText = `
                position:absolute;
                left: ${ pos[i].left}px;
                top: ${ pos[i].top}px;
            `;
        }
    };
    let temp = null; // 被拖拽元素
    // 事件绑定
    let _bindEventToView = function _bindEventToView() {
        let oDivs = [...root.querySelectorAll("div")];
        oDivs.forEach((item, index) => {
            item.addEventListener('dragstart', function (ev) { // 元素在开始被拖动时候触发
                ev = ev || window.event;
                // 记录当前被拖拽元素的位置
                ev.dataTransfer.setData("pos", `{
                    "top": ${ this.offsetTop},
                    "left": ${ this.offsetLeft}
                }`);
                temp = this; // 记录当前被拖拽元素
            }, false);
            item.addEventListener('drag', function () { // 元素在被拖动时频繁触发
            }, false);
            item.addEventListener('dragend', function () { // 在拖拽操作完成时触发
            }, false);
            item.addEventListener('dragenter', function (ev) { // 当被拖动元素进入到目的地元素所占据的屏幕空间时触发
                ev.preventDefault();
            }, false);
            item.addEventListener('dragover', function (ev) { // 当被拖动元素在目的地元素内时触发
                ev.preventDefault();
            }, false);
            item.addEventListener('drop', function (ev) { // 当被拖动元素在目的地元素里放下时触发
                ev = ev || window.event;
                // 获取当前位置
                let x = this.offsetLeft;
                let y = this.offsetTop;
                let source = JSON.parse(ev.dataTransfer.getData("pos")); // 获取源位置
                // 位置交换
                this.style.cssText = `
                    position: absolute;
                    top: ${ source.top}px;
                    left: ${ source.left}px
                `;
                temp.style.cssText = `
                    position: absolute;
                    top: ${ y}px;
                    left: ${ x}px;
                `;
                ev.preventDefault();
            }, false);
        });
    };
    return {
        init() {
            _getData();
            _render();
            _bindEventToView();
        },
    };
})();
dragModule.init();