void (() => {
    // 获取目标元素
    let $navs = $(".tab li"),
        $contents = $(".tabBox div"),
        prevIndex = 0;

    $navs.on('click', function () {

        let index = $(this).index();

        $navs.eq(prevIndex).removeClass("active");
        $contents.eq(prevIndex).removeClass("active");

        $(this).addClass("active");
        $contents.eq(index).addClass("active");
        prevIndex = index;
    });

})();