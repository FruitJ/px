// 封装 jQuery 插件 - 测试
$.fn.extend({
    execute() {
        this.initParams();
        this.initData();
        this.selector(this[0].corridorImgs.eq(0), 0); // 初始状态
        this.bindEventToView();
    },
    initParams() {

        let config = this[0];
        const { root, content, mask, scaleContent, corridor, } = config;

        config.root = $(`${root}`);
        config.content = $(`${content.selector}`, config.root);
        config.contentImg = $(`img`, config.content);
        config.mask = $(`${mask.selector}`, config.content);
        config.scaleContent = $(`${scaleContent.selector}`, config.root);
        config.scaleContentImg = $(`img`, config.scaleContent);
        config.corridorImgs = $(`${corridor}`, config.root).find("img");
        console.log(this);
    },
    initData() {
        const config = this[0];
        that = this;
        this.variable = {
            content_l: config.content.offset().left,
            content_t: config.content.offset().top,
            content_w: config.content.outerWidth(),
            content_h: config.content.outerHeight(),
            mask_w: config.mask.outerWidth(),
            mask_h: config.mask.outerHeight(),
            minLeft: 0,
            minTop: 0,

            proportion_w: config.scaleContent.outerWidth() / config.content.outerWidth(),
            proportion_h: config.scaleContent.outerHeight() / config.content.outerHeight(),
            prev: null,
        };
        this.variable.maxLeft = this.variable.content_w - this.variable.mask_w,
        this.variable.maxTop = this.variable.content_h - this.variable.mask_h,
        console.log(this.variable);
        
    },
    bindEventToView() {
        let config = this[0];
        let { variable } = this;

        config.content.on('mousemove', function (ev) {
            let x = ev.pageX; // 实时获取鼠标水平偏移
            let y = ev.pageY; // 实时获取鼠标垂直偏移
            x -= variable.content_l + variable.mask_w / 2; // 实时获取鼠标在小盒子内水平偏移
            y -= variable.content_t + variable.mask_h / 2; // 实时获取鼠标在小盒子内垂直偏移
            // 移动遮罩层
            config.mask.css({
                opacity: "1",
                top: y,
                left: x,
            });
            // 遮罩层边界处理
            if (x <= variable.minLeft) {
                config.mask.css("left", variable.minLeft);
            }
            
            if (x >= variable.maxLeft) {
                
                console.log(variable.minLeft);
                
                config.mask.css("left", variable.maxLeft);
            }
            if (y <= variable.minTop) {
                config.mask.css("top", variable.minTop);
            }
            if (y >= variable.maxTop) {
                config.mask.css("top", variable.maxTop);
            }
            // 根据比例反向移动大盒子中的图片
            config.scaleContentImg.css({
                top: -(y * variable.proportion_h),
                left: -(x * variable.proportion_w),
            });
        })

        config.content.mouseover(function () {
            config.scaleContent.css("opacity", 1);
            config.mask.css("opacity", 1);
        });
        config.content.mouseout(function () {
            config.mask.css("opacity", 0);
            config.scaleContent.css("opacity", 0);
        });
        let that = this;
        config.corridorImgs.each((index, item) => {
            $(item).on('click', function () {
                that.selector($(this), index);
            });
        });
    },
    selector(ele, index) {

        if (this.variable.prev !== null) this.variable.prev.css("borderColor", "#EEE");
        ele.css("borderColor", "gray");
        // 获取索引
        this[0].contentImg.get(0).src = `../img/qsmy-small-${index + 1}.jpg`;
        this[0].scaleContentImg.get(0).src = `../img/qsmy-big-${index + 1}.jpg`;
        this.variable.prev = ele;
    }
});

$({
    root: "#root",
    content: {
        selector: ".content",
        size: {
            width: 350,
            height: 350,
        }
    },
    mask: {
        selector: ".mask",
        size: {
            width: 238,
            height: 238,
        }
    },
    scaleContent: {
        selector: ".scale-content",
        size: {
            width: 545,
            height: 545,
        }
    },
    corridor: ".corridor",
    data: {
        small: ["qsmy-small-1.jpg", "qsmy-small-2.jpg", "qsmy-small-3.jpg"],
        big: ["qsmy-big-1.jpg", "qsmy-big-2.jpg", "qsmy-big-3.jpg"],
    },
}).execute();
$({
    root: "#root2",
    content: {
        selector: ".content",
        size: {
            width: 350,
            height: 350,
        }
    },
    mask: {
        selector: ".mask",
        size: {
            width: 238,
            height: 238,
        }
    },
    scaleContent: {
        selector: ".scale-content",
        size: {
            width: 545,
            height: 545,
        }
    },
    corridor: ".corridor",
    data: {
        small: ["qsmy-small-1.jpg", "qsmy-small-2.jpg", "qsmy-small-3.jpg"],
        big: ["qsmy-big-1.jpg", "qsmy-big-2.jpg", "qsmy-big-3.jpg"],
    },
}).execute();

