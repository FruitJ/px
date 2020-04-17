// 封装商城排序模块
let shopSortModule = (() => {

    // 获取目标元素
    let $lis = $("nav li"),
        $content = $(".content"),
        _data = [];
    // 获取数据
    let _getData = function _getData() {
        $.ajax({
            url: "../resource/data.json",
            method: "GET",
            dataType: "json",
            async: false,
            success(res) {
                _data = res;
            },
        });
    };

    // 渲染视图
    let _render = function _render() {
        let str = `<ul>`;
        $(_data).each((index, item) => {
            const { title, price, time, hot, img } = item;
            str += `
            <li>
                <div>
                    <img src=${ img} alt="">
                    <span class="name">${ title}</span>
                    <span class="price">价格: ￥${ price} 元</span>
                    <span class="hot">销量: ${ hot} 套</span>
                    <span class="time">时间: ${ time}</span>
                </div>
            </li>
            `;
        });
        str += `</ul>`;
        $content.html(str);
    };

    // 清除副作用
    let _clear = function _clear() {
        $lis.each((index, item) => {
            if(item.flag !== this.flag) item.flag = -1;
        });
    };

    // 绑定视图
    let _bindEventToView = function _bindEventToView() {
        $.map($lis, (item) => item.flag = -1); // 为每一个 li 设置标记
        $lis.on('click', function () {
            // 清除副作用
            _clear.apply(this);
            this.flag *= -1;
            // 获取当前标识
            let tag = $(this).attr("data-tag");
            // 数据排序
            _data.sort((a, b) => {
                a = String(a[tag]).replace(/-/g, "");
                b = String(b[tag]).replace(/-/g, "");
                return (a - b) * this.flag;
            });
            _render(); // 二次渲染
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
shopSortModule.init();