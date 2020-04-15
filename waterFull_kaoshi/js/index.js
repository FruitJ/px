// 封装瀑布流模块
let waterFullModule = (() => {

    // 获取目标元素
    let columns = [...document.querySelectorAll(".column")],
        _data = [];
    // 获取数据
    let _getData = function _getData() {

        // 创建 xhr 实例
        let xhr = new XMLHttpRequest();
        // 打开网络通道
        xhr.open('GET', '../json/data.json', false);
        // 设置监听回调
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);

            }
        }, false);
        // 发送请求
        xhr.send(null);
    };

    // 渲染数据
    let _render = function _render() {

        // 格式化数据
        _data = _data.map((item, index) => {

            const { width, height } = item;
            item.width = 230;
            item.height = height / (width / 230);
            return item;
        });

        // 排序
        for (let i = 0; i < _data.length; i += 3) {
            let groups = _data.slice(i, i + 3);
            groups.sort((a, b) => a.height - b.height);
            columns.sort((a, b) => b.offsetHeight - a.offsetHeight);

            groups.forEach((item, index) => {

                let card = document.createElement("div");
                card.classList = 'card';
                const { height, pic, title, link } = item;
                let str = `
                    <a href=${ link}>
                        <div class="lazyBox" style="height: ${ height}px;">
                            <img src="" alt="" data-image=${ pic}>
                        </div>
                        <p>${ title}</p>
                    </a>
                `;

                card.innerHTML = str;
                columns[index].appendChild(card);
            });
        }
    };

    // 图片懒加载
    let _lazyLoadPic = function _lazyLoadPic() {

        let html = document.documentElement;
        let lazyBoxs = document.querySelectorAll(".lazyBox");
        [...lazyBoxs].forEach((item, index) => {
            let isLoad = item.getAttribute("isLoad");
            if (isLoad === "true") return;
            let targetH = utils.offset(item).top + item.offsetHeight / 2;
            let judgeH = html.clientHeight + html.scrollTop;
            if (judgeH >= targetH) {
                // 懒加载
                _lazyLoad(item);
            }
        });
    };

    let _lazyLoad = function _lazyLoad(item) {
        let img = item.querySelector("img");
        let uri = img.dataset.image;
        let tempImage = new Image();
        tempImage.src = uri;
        tempImage.onload = function () {
           
            img.src = uri;
            utils.css(img, 'opacity', 1);
        };
        tempImage = null;
        item.setAttribute("isLoad", true);
    };

    // 加载更多
    let flag = false;
    let _loadMore = function _loadMore() {
        if(flag) return;
        let html = document.documentElement;
        let targetH = html.scrollHeight;
        let judgeH = html.clientHeight * 1.5 + html.scrollTop;
        if (judgeH >= targetH) {
            flag = true;
            _getData();
            _render();
            _lazyLoadPic();
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