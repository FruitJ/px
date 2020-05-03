// 封装 bilibili 右侧楼层导航模块
let bilibiliNavModule = (function () {

    // 获取目标元素
    let html,
        section,
        boards,
        titles,
        height,
        currentIndex = 0,
        moveIndex = 0,
        targetIndex = 0,
        prev,
        py,
        data = ["音乐", "动漫", "国创", "生活", "TV 剧", "科技", "纪录片"];
    const ELEMENT_NUM = 7;

    let utils = {
        offset(ele) {
            let parent = ele.offsetParent;
            let left = ele.offsetLeft;
            let top = ele.offsetTop;
            while (parent !== null) {
                if (/MSIE 8/.test(navigator.userAgent)) {
                    left += parent.clientLeft;
                    top += parent.clientTop;
                }
                console.log(parent);
                left += parent.offsetLeft;
                top += parent.offsetTop;
                parent = parent.offsetParent;
            }
            return {
                top,
                left,
            };
        },
    };

    let _render = function _render() {
        let str = `<section id="section">`;
        let temp = `<nav id="sideNav"><ul>`;
        data.forEach((item, index) => {
            str += `
                <div>${ item}</div>
            `;
            temp += `
                <li draggable="true" data-index="${ index}" data-board="${index}">
                    ${item}
                </li>
            `;
        });
        temp += ` </ul></nav>`;
        str += `
            </section>
            ${ temp}
        `;
        document.body.innerHTML = str;
    };

    // 初始化样式
    let _initStyle = function _initStyle() {
        html = document.documentElement;
        height = html.clientHeight;
        section = document.querySelector("#section");
        boards = section.querySelectorAll("div");
        titles = [...document.querySelector("#sideNav").getElementsByTagName("li")];
        html.style.height = `${ELEMENT_NUM * height}px`;
        py = Number.parseFloat(window.getComputedStyle(titles[0], null)["height"]) + Number.parseFloat(window.getComputedStyle(titles[0], null)["margin-bottom"]);
        let relativePos = [];
        for (let i = 0; i < ELEMENT_NUM; i++) {
            boards[i].style.cssText = `
                width: 100%;
                height: ${ height}px;
            `;
        }
        titles.forEach((item, index) => {
            relativePos.push(item.offsetTop);
        });

        titles.forEach((item, index) => {
            item.style.cssText = `
                position: absolute;
                top: ${ relativePos[index]}px;
                left: ${ 0}px;
            `;
        });
    };

    // 事件绑定
    let _bindEventToView = function _bindEventToView() {
        // 点击变色
        prev = titles[0];
        prev.style.color = `red`;
        let targetPos = {};
        let flag = false;
        let translate = 0;
        let temp = null;
        titles.forEach((item, index) => {
            item.addEventListener('click', function () {

                this.style.color = `red`;
                if (prev !== null) prev.style.color = "#FFF";
                currentIndex = index;
                let maxTop = utils.offset(boards[Number(this.dataset.board)]).top;
                document.documentElement.scrollTop = maxTop;
                prev = this;
            }, false);
        });
        // 拖拽导航
        titles.forEach((item, index) => {
            item.addEventListener('dragstart', function (ev) {
                // 记录当前位置
                targetPos.top = this.offsetTop;
                targetPos.left = this.offsetLeft;
                moveIndex = Number(this.dataset.index);
                temp = item;
                translate = ev.clientY;
            }, false)
            item.addEventListener('drag', function (ev) {
                flag = ev.clientY < translate ? false : true;
            }, false)
            item.addEventListener('dragend', function () {
            }, false)
            item.addEventListener('dragenter', function (ev) {
                ev = ev || window.event;
                ev.preventDefault();
            }, false)
            item.addEventListener('dragover', function (ev) {
                ev = ev || window.event;
                ev.preventDefault();
            }, false)
            item.addEventListener('drop', function (ev) {
                ev = ev || window.event;
                // 清空位置数组
                let l = this.offsetLeft;
                let t = this.offsetTop;
                // 将自己放置到此位置
                temp.style.cssText = `
                    position: absolute; 
                    top: ${ t}px;
                    left: ${ l}px;
                `;
                targetIndex = Number(this.dataset.index);
                let arr = titles.filter((item, index) => item !== temp);

                arr.forEach((item, index) => {
                    if (!flag) {

                        if (index >= targetIndex && index < moveIndex) {
                            item.style.cssText = `
                                position: absolute;
                                top: ${ item.offsetTop + py}px;
                                left: ${ targetPos.left}px;
                            `;
                        }
                    } else {
                        if (index >= moveIndex && index < targetIndex) {
                            item.style.cssText = `
                            position: absolute;
                            top: ${ item.offsetTop - py}px;
                            left: ${ targetPos.left}px;
                        `;
                        }
                    }
                });
                titles = titles.sort((a, b) => a.offsetTop - b.offsetTop).map((item, index) => {
                    item.dataset.index = index;
                    if (index === currentIndex) {
                        item.style.color = `red`;
                        prev.style.color = `#FFF`;
                        prev = item;
                    }
                    return item;
                });
                let maxTop = utils.offset(boards[Number(titles[currentIndex].dataset.board)]).top;
                document.documentElement.scrollTop = maxTop;
                ev.preventDefault();
            }, false)
        });
    };

    return {
        init() {
            _render();
            _initStyle();
            _bindEventToView();
        },
    };
})();
bilibiliNavModule.init();