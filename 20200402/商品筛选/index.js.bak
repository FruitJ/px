// 商品筛选
let shopFilter = (function () {
    let ul;
    let oLis;
    let res;

    // 获取目标元素(初始化)
    function querySelectorAll() {
        // 获取目标元素
        ul = document.querySelector("#type");
        oLis = ul.querySelectorAll("li");
        res = [];

        // 初始化 dom 元素
        [...oLis].forEach((item, index) => {
            let list = item.querySelectorAll("a");
            [...list].forEach((item, index) => {
                item.dataset.index = index;
                item.dataset.isEnabled = false;
            });
        });
    }

    // 实现单选功能
    function _singleSlector(target, li) {
        let nodes = Array.from(li.children);

        let temp = nodes.filter((item, index) => item.dataset.isEnabled === "true");

        if (temp.length !== 0) {
            _changeStatus(temp[0], false, "#000");
        }
        target.dataset.isEnabled = true;
        target.style.color = "red";
        _changeStatus(target, true, "red");
    }

    // 实现根据单选进行数据切换功能
    function _initSelectorData(target, li) {
        let obj = {
            value: target.innerText,
            index: target.dataset.index,
            parentNode: li,
            isVisited: true,
        };

        let flag = true;

        for (let i = 0; i < res.length; i++) {
            if (res[i].parentNode === obj.parentNode) {
                res[i] = obj;
                flag = false;
            }
        }
        flag ? res.push(obj) : null;
        _render(res); // 渲染 tags 
    }

    // 渲染 tags
    function _render(res) {
        let str = '';
        let tags = document.querySelector("#tags");
        res.forEach((item, index) => {
            str += `
            <div>
                <span class="tag-name">
                    ${ item.value}
                </span>
                <span class="remove" data-res-index="${ index}">X</span>
            </div>
            `;

            res[index].resIndex = index;
        });
        tags.innerHTML = str;
        removeTags();
    }

    // 移除 tags
    function removeTags() {
        // 获取 .remove
        let removeBtns = document.querySelectorAll(".remove");
        // 为 .remove 绑定点击事件
        [...removeBtns].forEach((item, index) => {
            item.addEventListener('click', function () {
                if (res[index].resIndex == item.dataset.resIndex) {
                    let li = res[index].parentNode;
                    let _index = res[index].index;
                    _changeStatus(li.children[_index], false, "#000");
                }
                res = res.filter((m) => {
                    return m.resIndex != item.dataset.resIndex;
                });
                _render(res);
            }, false);
        });
    }

    // 为 ul 绑定点击事件
    function bindEventToElement() {
        // 为 ul 绑定点击事件监听
        ul.addEventListener('click', function (ev) {
            ev = ev ?? window.event;
            let target = ev.target ?? ev.srcElement;
            if (target.nodeName.toLowerCase() === "a") {
                // 获取父级元素 (li)
                let li = target.parentNode;

                _singleSlector(target, li);

                _initSelectorData(target, li);
            }
        }, false);
    }
    // 改变 a 标签状态
    function _changeStatus(ele, flag, color) {
        ele.dataset.isEnabled = flag;
        ele.style.color = color;
    }
    return {
        init: {
            querySelectorAll,
            bindEventToElement,
            removeTags,
        },
    };
})();

shopFilter.init.querySelectorAll();
shopFilter.init.bindEventToElement();
shopFilter.init.removeTags();
