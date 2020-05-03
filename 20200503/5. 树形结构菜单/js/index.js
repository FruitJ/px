// 封装树形结构菜单模块
let treeModule = (function () {

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
        function build(data) {
            let str = ``;
            data.forEach((item, index) => {

                str += `
                    <li><i class="icon iconfont ${ !item.children ? 'no' : ''}">${item.children ? '&#xe65b;' : '&#xe640;'}</i>  ${item.name}
                        ${ item.children ? `
                        
                            <ul>
                                ${ build(item.children)}
                            </ul>
                        ` : ''}
                    </li>
                `;
            });
            return str;
        }

        root.innerHTML = `<ul class="show">${build(data)}</ul>`;
    };

    // 事件绑定
    let _bindEventToView = function () {
        // 获取 ul
        root.addEventListener('click', function (ev) {
            ev = ev || window.event;
            ev.target = ev.target || ev.srcElement;
            let target = ev.target;
            if (target.nodeName.toLowerCase() === "i" && !target.className.includes("no")) {
                let next = target.nextElementSibling;
                console.log(next);
                
                let status = window.getComputedStyle(next, null)["display"];
                if(status === "block"){
                    next.style.display = "none";
                    target.innerHTML = `&#xe65b;`;
                    [...next.querySelectorAll("ul")].forEach((item, index) => {
                        item.style.display = "none";
                    });
                    [...next.querySelectorAll("i")].forEach((item, index) => {
                        item.innerHTML = `&#xe65b;`;
                    });
                }else {
                    next.style.display = "block";
                    target.innerHTML = `&#xe61e;`;
                }
            }
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
treeModule.init();