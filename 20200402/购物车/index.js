let shopCart = (function () {
    // 初始化模拟数据
    let data = [{ unit_price: 12.5, number: 0 }, { unit_price: 10.5, number: 0 }, { unit_price: 8.5, number: 0 }, { unit_price: 8, number: 0 }, { unit_price: 14.5, number: 0 }],
        oLis,
        btns, //  加减按钮
        strongs, // 单价和小计
        info, // 底部汇总区域
        addBtns = [], // 按钮数组(加)
        removeBtns = [], // 按钮数组(减)
        nums = [], // 数量数组
        unit_prices = [], // 单价
        totals = [], // 小计
        cumulativeNum, // 总件
        cumulativePrice, // 总计
        maxExpensive; // 最贵

    function querySelectorAll() {
        // 获取目标元素
        oLis = document.querySelectorAll(".wrap .box .list li");
        btns = document.querySelectorAll(".wrap .box .list li i");
        strongs = document.querySelectorAll(".wrap .box .list li strong");
        info = document.querySelectorAll(".wrap .box .info")[0];
        cumulativeNum = info.querySelectorAll("em")[0],
        cumulativePrice = info.querySelectorAll("em")[1],
        maxExpensive = info.querySelectorAll("em")[2];
        for (let i = 0; i < btns.length; i++) {
            if (i % 2 === 0) {
                removeBtns.push(btns[i]);
                unit_prices.push(strongs[i]);
            } else {
                addBtns.push(btns[i]);
                totals.push(strongs[i]);
            }
        }
        [...oLis].forEach((item, index) => {
            nums.push(item.querySelectorAll("em")[0]);
        });
    }

    // 为按钮(加减)绑定 dom 点击事件监听
    function bindEventToElement() {
        addBtns.forEach((item, index) => {

            item.addEventListener('click', function () {
                changeViewData(index, ++data[index].number);
            }, false);
            removeBtns[index].addEventListener('click', function () {
                data[index].number !== 0 ? changeViewData(index, --data[index].number) : null;
            }, false);
        });
    }

    // 更新视图数据
    function changeViewData(index, num) {
        // 计算小计
        let total = num * data[index].unit_price;
        // 计算总件
        let _cumulativNum = data.reduce((prev, next) => prev + next.number, 0);
        // 计算总计
        let _cumulativPrice = data.reduce((prev, next) => prev + next.number * next.unit_price, 0);
        // 计算最贵
        let _maxExpensive = Math.max.apply(null, data.filter((item) => item.number !== 0).map((item) => item.unit_price));

        // render ...
        render(index, num, total, _cumulativNum, _cumulativPrice, _maxExpensive);
    }
    // 渲染视图
    function render(index, num, total, _cumulativNum, _cumulativPrice, _maxExpensive) {
        nums[index].innerText = num;
        totals[index].innerText = `${total}元`;
        cumulativeNum.innerText = _cumulativNum;
        cumulativePrice.innerText = _cumulativPrice;
        maxExpensive.innerText = Number.isFinite(_maxExpensive) ? _maxExpensive : 0;
    }

    return { // 暴露接口
        init: {
            querySelectorAll,
            bindEventToElement,
        }
    };
})();

// execute ...
shopCart.init.querySelectorAll();
shopCart.init.bindEventToElement();