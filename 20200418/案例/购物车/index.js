// $(document).ready(function(){}) DOM 结构加载完成才会执行
// 监听的是 DOMContentLoaded 事件 (和 load 事件不同, window.onload 是所有资源都加载完)
// 此操作也可以形成一个私有的闭包
$(function () {

    // 获取目标元素
    let $btns = $("i");
        $count_ems = $("ul em"), // 数量
        $price = $("strong:even"), // 单价
        $total = $("strong:odd"), // 小计
        $allCount = $(".info em:first"), // 总件数
        $allTotal = $(".info em").eq(1), // 总价
        $maxPrice = $(".info em:last"); // 最贵单价

    function computed() {
        let sum = $count_ems.toArray().reduce((prev, next) => prev + parseFloat($(next).html()), 0);
        $allCount.html(sum);
        allTotal = $total.toArray().reduce((prev, next) => prev + parseFloat($(next).html()), 0);
        $allTotal.html(allTotal.toFixed(2));

        let arr = [];
        $count_ems.each((index, item) => {
            if ($(item).html() >= 1) {
                arr.push(parseFloat($price.eq(index).html()));
            }
        });
        arr.push(0);
        $maxPrice.html(Math.max(...arr));
    }
    computed();

    $btns.on('click', function () {
        let $this = $(this),
            flag = $this.attr("data-btn"),
            $parent = $this.parent(),
            $countBox = $parent.find('em'),
            $strong = $parent.find("strong"),
            $xiaojiBox = $strong.eq(1),
            $priceBox = $strong.eq(0);
        let count = parseFloat($countBox.html());
        if (flag === "plus") {
            count++;
            count > 10 ? count = 10 : null;
        } else {
            count--;
            count < 0 ? count = 0 : null;
        }
        $countBox.html(count);
        $xiaojiBox.html(count * parseFloat($priceBox.html()));

        computed();
    })
});