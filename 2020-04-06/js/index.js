// 封装购物车模块
let shopModule = (function () {

    // 获取目标元素
    let oLis = document.querySelector(".nav").querySelectorAll("li"),
        content = document.querySelector(".content"),
        data = [];

    // 初始化数据
    let _initData = function initData() {

        // 创建 xhr 实例
        let xhr = new XMLHttpRequest();
        // 设置回调
        xhr.addEventListener('readystatechange', function () {

            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }, false);
        // 打开网络通道
        xhr.open('GET', './json/product.json', false);
        // 发送请求
        xhr.send(null);
    };

    // 渲染视图
    let _render = function _render() {
        console.log(data);
        let str = `<ul>`;
        data.forEach((item, index) => {
            const { id, price, img, hot, time, title } = item;
            str += `
                <li>
                    <div>
                        <img src=${ img} alt="">
                        <span class="name">${ title}</span>
                        <span class="price">价格: ￥${ price} 元</span>
                        <span class="time">时间: ${ time}</span>
                        <span class="hot">热度: ${ hot} 套</span>
                    </div>
                </li>
            `;
        });
        str += `</ul>`;
        content.innerHTML = str;
    };

    // 清除副作用
    let _clear = function _clear() {

        [...oLis].forEach((item, index) => {

            if(this !== item) {
                item.flag = -1;
            }
        }); 
    };

    // 绑定事件
    let _bindEventToView = function _bindEventToView() {
        [...oLis].forEach((item, index) => {

            item.flag = -1;

            item.addEventListener('click', function () {

                _clear.apply(this);

                this.flag *= -1;

                let tag = this.dataset.tag;

                data.sort((a, b) => {

                    a = String(a[tag]).replace(/-/g, "");
                    b = String(b[tag]).replace(/-/g, "");
                    return (a - b) * this.flag;
                });

                _render();
            }, false);

        });
    };

    return {
        init() {
            _initData();
            _render();
            _bindEventToView();
        },
    };
})();
shopModule.init();