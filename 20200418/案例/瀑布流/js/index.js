// 封装瀑布流模块
let waterFullModule = (function () {

    // 获取目标元素
    let $columns = $(".column"),
        _data = [],
        count = 0;

    // 获取数据
    let _getData = function _getData() {

        $.ajax({
            url: "./json/data.json",
            method: "GET",
            async: false,
            success(res) {
                _data = res;
            },
        });
    };

    // 渲染视图:
    let _render = function _render() {
        // 格式化数据
        _data = $(_data).map((index, item) => {
            const { width, height } = item;
            item.width = 230;
            item.height = height / (width / 230);
            return item;
        });

        // 排序 + 渲染
        for (let i = 0; i < _data.length; i += 3) {
            let groups = _data.slice(i, i + 3);
            groups.sort((a, b) => a.height - b.height);
            $columns.sort((a, b) => b.offsetHeight - a.offsetHeight);
            $(groups).each((index, item) => {

                const { height, title, link, pic } = item;
                $(`
                <div class="card">
				<a href=${ link}>
					<div class="lazyImageBox" style="height: ${ height}px;">
						<img src="" alt="" data-image=${ pic}>
					</div>
					<p>${ title}</p>
				</a>
			</div>
                `).appendTo($columns.eq(index));

            });
        }
    };

    // 图片懒加载
    let _lazyLoadPic = function _lazyLoadPic() {
        $lazyImageBoxs = $(".lazyImageBox");

        $lazyImageBoxs.each((index, item) => {
            let val = $(item).find("img").attr("data-image");

            if (!val) return;
            let targetH = $(item).offset().top + $(item).outerHeight() / 2;
            let judgeH = $(window).outerHeight() + $(window).scrollTop();
            if (judgeH >= targetH) {
                // 懒加载
                _lazyLoad(item);
            }
        });
    };

    let _lazyLoad = function _lazyLoad(item) {
        // 获取 img
        let img = $(item).find("img"),
            url = img.attr("data-image"),
            tempImage = new Image();
        tempImage.src = url;
        tempImage.onload = function () {
            $(img).attr("src", url);
            $(img).css("opacity", 1);
        };
        tempImage = null;
        $(item).removeAttr("data-image");
    };

    // 加载更多
    let flag = false;
    let _loadMore = function _loadMore() {
        let targetH = $("body").outerHeight();
        let judgeH = $(window).outerHeight() * 1.5 + $(window).scrollTop();
        if (judgeH >= targetH) {
            if (flag) return;
            flag = true;
            if (count < 5) {
                count++;
                _getData();
                _render();
                flag = false;
            }
            flag = false;
        }
    };
    return {
        init() {
            _getData();
            _render();
            _lazyLoadPic();
            $(window).on('scroll', function () {
                _loadMore();
                _lazyLoadPic();
            });
        },
    };
})();
waterFullModule.init();