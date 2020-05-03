let navModule = (function () {
    // 获取目标元素
    let header = document.querySelector("#header"),
        main = document.querySelector("#main"),
        sider = main.querySelector(".sider");
        data = [];
    // 获取数据
    let _getData = function _getData() {
        // 获取 xhr 实例
        let xhr = new XMLHttpRequest();
        // 打开网络请求通道
        xhr.open("GET", "../resource/data.json", false);
        // 设置回调监听
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }, false);
        // 发送请求
        xhr.send(null);
    };
    // 渲染视图
    let _render = function _render() {
        console.log(data);
        let { title, topNavList, sideTitle, sideNavList } = data;
        let topNavStr = `
            <div class="top-nav">
                <div class="mask">
                    <div class="top-nav-bar">
                    </div>
                </div>
            <ul>
        `;
        let sideNavStr = `<ul>`;
        title.forEach((item, index) => {
            topNavStr += `
                <li data-index=${ index}>${item}</li>
            `;
        });
        topNavStr += `
        <div class="slider">
        `;
        sideTitle.forEach((item, index) => {
            sideNavStr+=`
                <li data-index=${ index }>
                    ${ item }
                    <i>></i>
                </li>
            `;
        });
        topNavList[0].forEach((item, index) => {
            let { pic, name, price } = item;
            topNavStr += `
            <div class="item">
                <div class="img">
                    <img src=${ pic} alt="">
                </div>
                <div class="show">
                    <span>${ name}</span>
                    <span>${ price}元起</span>
                </div>
            </div>
            `;
        });
        sideNavStr += `<div class="board">`;
        sideNavList[0].forEach((item, index) => {
            let { pic, title } = item;
            sideNavStr +=`
                <div class="side-item">
                    <img src="${ pic }" alt="">
                    <span>${ title }</span>
                </div>
            `;
        });
        sideNavStr += `</div></ul>`; 
        topNavStr += `</div></ul>`;
        header.innerHTML = topNavStr;
        sider.innerHTML = sideNavStr;
    };
    // 事件绑定
    let _bindEventToView = function _bindEventToView() {
        let ul = header.querySelector("ul"),
            oLis = [...ul.querySelectorAll("li")],
            slider = header.querySelector(".slider"),
            sideNavUl = sider.querySelector("ul"),
            sideNavLis = [...sideNavUl.querySelectorAll("li")];
            board = sideNavUl.querySelector(".board"),
            { topNavList, sideNavList } = data;
            
        ul.addEventListener('mousemove', function (ev) {
            ev = ev || window.event;
            ev.target = ev.target || ev.srcElement;
            let index = Number(ev.target.dataset.index);
            if (ev.target.nodeName.toLowerCase() === "li") {
                if (topNavList[index]) {
                    slider.style.top = "140px";
                } else {
                    slider.style.top = "-90px";
                    return;
                }
            }
        }, false);
        ul.addEventListener('mouseleave', function (ev) {
            ev = ev || window.event;
            slider.style.top = "-90px";
        }, false);
        oLis.forEach((item, index) => {
            item.addEventListener('mouseenter', function(ev) {
                let index = Number(ev.target.dataset.index);
                    let str = ``;
                    if(topNavList[index]) {
                        topNavList[index].forEach((item, index) => {
                            let { pic, name, price } = item;
                            str += `
                                <div class="item">
                                    <div class="img">
                                        <img src=${ pic} alt="">
                                    </div>
                                    <div class="show">
                                        <span>${ name}</span>
                                        <span>${ price}元起</span>
                                    </div>
                                </div>
                            `;
                        });
                        slider.innerHTML = str;
                    }
                }, false);
        });
        sideNavLis.forEach((item, index) => {
            item.addEventListener('mouseenter', function(ev) {
                ev = ev || window.event;
                ev.target = ev.target || window.event;
                if(ev.target.nodeName.toLowerCase() === "li") {
                    // 切换数据源
                    let index = Number(ev.target.dataset.index);
                    let str = ``;
                    sideNavList[index].forEach((item, index) => {
                        str+=`
                            <div class="side-item">
                                <img src="${ item.pic }" alt="">
                                <span>${ item.title }</span>
                            </div>
                        `;
                    });
                    board.innerHTML = str;
                }
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
navModule.init();