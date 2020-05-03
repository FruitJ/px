// 封装花瓣网瀑布流效果
let waterFullModule = (function () {

    // 获取目标元素
    let columns = [...document.querySelectorAll(".column")],
        data = [];

    // 获取绝对的 offset 值
    function offset(ele) {
        let parent = ele.offsetParent;
        let l = ele.offsetLeft;
        let t = ele.offsetTop;

        while (parent !== document.body) {
            if (/MSIE 8/.test(navigator.userAgent)) {
                l += parent.clientLeft;
                t += parent.clientTop;
            }
            l += parent.offsetWidth;
            t += parent.offsetHeight;
            parent = parent.offsetParent;
        }
        return {
            top: t,
            left: l,
        };
    }

    // 获取数据
    let _getData = function _getData() {
        // 创建 xhr 实例
        let xhr = new XMLHttpRequest();
        // 打开网络请求通道
        xhr.open('GET', '../resource/data.json', false);
        // 设置回调监听
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }, false);
        xhr.send(null);
    };

    // 渲染视图
    let _render = function _render() {

        // 调整数据
        data = data.map((item, index) => {

            let { width, height } = item;
            let w = 236;
            let h = (w * height) / width;
            item.width = w;
            item.height = h;
            return item;
        });

        // 排序
        for (let i = 0; i < data.length; i += 5) {
            let group = data.slice(i, i + 5);
            group.sort((a, b) => a.height - b.height);
            columns.sort((a, b) => b.offsetHeight - a.offsetHeight);
            group.forEach((item, index) => {
                let str = ``;
                let { pic, link, height } = item;
                str = `
                <div class="card">
                    <a href=${ link}>
                        <div class="lazyBox" style="height: ${ height}px">
                            <img src="" alt="" data-img=${ pic}>
                        </div>
                        <div class="show">
                            <div class="circle"></div>
                            <p class="up">
                                <span>XY大金鱼</span>
                                <span style="color: #999">采集到</span>
                            </p>
                            <p class="down">

                                <span>游戏原画</span>
                            </p>
                        </div>
                    </a>
                </div>    
                `;
                columns[index].innerHTML += str;
            });
        }
    };

    // 懒加载
    let _lazyLoadPic = function _lazyLoadPic() {
        // 获取 。lazyBox
        let lazyBox = document.querySelectorAll(".lazyBox");
        let html = document.documentElement;
        [...lazyBox].forEach((item, inhdex) => {
            // 获取当前
            let isLoaded = item.getAttribute("isLoaded");
            if (isLoaded === "true") return;
            let h = offset(item).top + item.offsetHeight / 2;
            let judge = html.clientHeight + html.scrollTop;
            if (judge >= h) {
                // 懒加载
                _lazy(item);
            }
        });
    };

    let _lazy = function _lazy(item) {
        // 获取 img 
        let img = item.querySelector("img");
        // 获取 url
        let url = img.dataset.img;
        // 创建临时 Image 对象
        let image = new Image();
        image.src = url;
        image.onload = function () {
            // 替换
            img.src = url;
            img.style.opacity = 1;
        };
        item.setAttribute("isLoaded", true);
    };

    // 加载更多
    let flag = false;
    let _loadMore = function _loadMore() {
        if(flag) return;
        let html = document.documentElement;
        let targetH = html.scrollHeight;
        let judgeH = html.clientHeight * 1.5 + html.scrollTop;
        console.log(targetH);
        
        if(judgeH >= targetH) {
            flag = true;
            _getData();
            _render();
            flag = false;
        }
    };

    return {
        init() {
            _getData();
            _render();
            _lazyLoadPic();
            window.onscroll = function () {
                _lazyLoadPic();
                _loadMore();
            };
        },
    };
})();
waterFullModule.init();