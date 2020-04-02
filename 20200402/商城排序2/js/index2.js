void (() => {
    // 获取数据(发送 Ajax 请求异步获取数据)
    $.getJSON("../resource/data.json", {
        request: "data",
    }, function (json) {
        let _data = json,// 获取数据
            productbox = document.querySelectorAll(".productbox")[0]; // 获取 .productbox (商品卡片的容器)
        const INSTRUCTIONS = ["time", "total"]; // 排序指令集和

        // 商品卡片(组件)类
        class ShopCardsComponent {
            constructor(element) {
                this.element = element;
            }
            _initView() {
                let str = '';
                _data.forEach((item, index) => {
                    str += `<div class="card">
                            <img src=${ item.pic_url} class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${ item.goodsName}</h5>
                                <p class="card-text">价格: ￥${ item.price.toFixed(2)} 元</p>
                                <p class="card-text">销量: ${ item.total}套</p>
                                <p class="card-text">时间: ${ item.time}</p>
                                <a href="#" class="btn btn-primary">立即购买</a>
                            </div>
                        </div>`;
                });
                // 向页面追加商品数据
                this.element.innerHTML = str;
            }
            _sortView(instruction, _data, boards, sorted, that) {
                sorted.sort((a, b) => instruction !== "time" ? (a[instruction] - b[instruction]) * that.flag : (+new Date(a[instruction]) - (+new Date(b[instruction]))) * that.flag);
                this._dealWithView(sorted, _data, boards);
            }
            _dealWithView(sorted, _data, boards) {
                let bottom_space = Number.parseInt(getComputedStyle(this.element.querySelectorAll(".card")[0], null)["margin-bottom"]);
                $.each(sorted, (index, item) => {
                    item.position.top = _data[index].position.top;
                    item.position.left = _data[index].position.left;
                    boards[index].style.transitionDuration = '1.5s';
                    boards[item.index].style.cssText = `
                            position: absolute;
                            top: ${ item.position.top === 0 ? 0 : boards[index].offsetHeight + bottom_space}px;
                            left: ${ item.position.left}px;
                                margin-right: 1%;
                                transform: rotate(360deg);
                            `;
                });
            }
        }
        let sc = new ShopCardsComponent(productbox);
        sc._initView();
        let boards = document.querySelectorAll(".container .productbox .card");
        // 商品数据(组件)类
        class ShopDataComponent {
            constructor() {}
            initPositionData(boards, data) {
                // 初始化位置数据
                [...boards].forEach((item, index) => {
                    data[index].position = {
                        top: item.offsetTop,
                        left: item.offsetLeft,
                    };
                });
            }
            initSortData(data) {
                // 初始化排序数据
                return data.map((item, index) => ({
                    position: item.position,
                    time: item.time,
                    total: item.total,
                    price: item.price,
                    index,
                }));
            }
        }
        let sd = new ShopDataComponent();
        sd.initPositionData(boards, _data);
        // 导航条(组件)类
        class NavBarComponent {
            constructor(elements) {
                this.elements = elements;
            }
            _bindEventToEle(sorted, _data, boards) {
                console.log(sd);
                let elements = [...this.elements],
                    btn = elements.shift(),
                    prev = btn.querySelectorAll(".price-sort-btns i.prev")[0],
                    next = btn.querySelectorAll(".price-sort-btns i.next")[0],
                    that = this;
                elements.forEach((item, index) => {
                    item.instruction = INSTRUCTIONS[index];
                    item.flag = -1;
                    item.addEventListener('click', function () {
                        that.clear.call(this, elements);
                        this.flag *= -1;
                        sc._sortView(this.instruction, _data, boards, sorted, this);
                    }, false);
                });
                prev.flag = 1;
                prev.addEventListener('click', function () {
                    that.clear.call(this, elements);
                    sc._sortView("price", _data, boards, sorted, this);
                }, false);
                next.flag = -1;
                next.addEventListener('click', function () {
                    that.clear.call(this, elements);
                    sc._sortView("price", _data, boards, sorted, this);
                }, false);
            }
            clear(elements) {
                [...elements].forEach((item, index) => {
                    if (item !== this) item.flag = -1;
                });
            }
        }
        let nb = new NavBarComponent(document.querySelectorAll("#navbarSupportedContent .nav-item"));
        nb._bindEventToEle(sd.initSortData(_data), JSON.parse(JSON.stringify(_data)), boards);
    });
})();