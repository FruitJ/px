// 封装推拉门模块
let slidingDoorModule = (function () {
    // 获取目标元素
    let root = document.querySelector("#container"),
        list,
        show,
        img,
        max_len,
        lastItem,
        data = [];
    let relativePos;
    let utils = {
        prevAll(ele, del) { // 获取入参元素所有前面的元素
            let node = ele.previousElementSibling;
            let arr = [];
            while (node) {
                if (node !== del) {
                    arr.push(node);
                }
                node = node.previousElementSibling;
            }
            arr.reverse();
            arr.push(ele);
            return arr;
        },
        nextAll(ele) { // 获取入参元素所有后面的元素
            let node = ele.nextElementSibling;
            let arr = [];
            while (node) {
                arr.push(node);
                node = node.nextElementSibling;
            }
            return arr;
        },
        reset(relativePos) {
            list.forEach((item, index) => {
                item.style.cssText = `
                    position: absolute;
                    left: ${ relativePos[index].left}px;
                    top: ${ relativePos[index].top}px;
                `;
            });
            img.style.opacity = 0;
            img.style.transition = `all 1.5s ease 0s`;
        },
    };

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
        let str = `<div class="show" style="transition: all 1s ease 0s;">
            <img src="" alt="">
        </div>`;
        data.forEach((item, index) => {
            str += `
                <div class="item">
                    <img src="${ item.smallPic}" alt="">
                </div>
            `;
        });
        root.innerHTML = str;
    };

    // 重置样式
    let _initDOMData = function _initDOMData() {

        // 获取相对定位下的位置信息
        list = [...root.querySelectorAll(".item")];
        show = root.querySelector(".show");
        img = show.querySelector("img");
        relativePos = [];
        for (let i = 0; i < data.length; i++) {
            relativePos.push({
                top: list[i].offsetTop,
                left: list[i].offsetLeft,
            });
        }
        max_len = relativePos[relativePos.length - 1].left;
        lastItem = list[list.length - 1];
        // 基于绝对定位重重置元素位置
        relativePos.forEach((item, index) => {
            list[index].offsetLeft;
            list[index].style.cssText = `
                position: absolute;
                left: ${ item.left}px;
                top: ${ item.top}px;
                transition: all 1s ease 0s;
            `;
        });
    };
    // 事件绑定
    let _bindEventToView = function _bindEventToView() {

        let prevAll = null;
        let nextAll = null;
        list.forEach((item, index) => {
            item.addEventListener('mouseenter', function () { // 鼠标移入每项时触发
                prevAll = utils.prevAll(this, show);
                nextAll = utils.nextAll(this, lastItem);
                img.src = data[index].bigPic;
                img.style.opacity = `1`;
                prevAll.forEach((item, index) => { // 当前项包括当前项前面的元素归为到第一个元素位置【除最后一项】
                    item.offsetLeft;
                    if (item !== lastItem) {
                        item.style.cssText = `
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        transition: all 1s ease 0s;                      
                        `;
                    }
                });
                nextAll.forEach((item, index) => { // 当前项包括当前项前面的元素归为到最后一个元素位置【除第一项】
                    item.offsetLeft;
                    item.style.cssText = `
                    position: absolute;
                    left: ${ max_len}px;
                    top: 0px;
                    transition: all 1s ease 0s;                  
                    `;
                });

            }, false);
            show.addEventListener('mouseleave', function () { // 鼠标离开 img 时触发
                utils.reset(relativePos);
            }, false);
            list[0].addEventListener('mouseleave', function () { // 鼠标离开第一个元素项时候触发
                utils.reset(relativePos);
            }, false);
            list[list.length - 1].addEventListener('mouseleave', function () { // 鼠标离开最后一个元素项时候触发
                utils.reset(relativePos);
            }, false);

        });
    };
    return {
        init() {
            _getData();
            _render();
            _initDOMData();
            _bindEventToView();
        },
    };
})();
slidingDoorModule.init();