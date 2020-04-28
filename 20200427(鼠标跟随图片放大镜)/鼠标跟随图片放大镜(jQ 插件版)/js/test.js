// 封装 jQuery 插件 - 测试
$.fn.extend({
    execute() {
        this.initParams();
    },
    initParams() {

        let config = this[0];
        const { root, } = config;
        console.log(config);
        
        config.root = $(`${ root }`);
        console.log( $(`${ root }`));
        
        console.log(root);
        console.log(document.querySelector(root));
        
        // 获取元素
        // this.nodes = {
        //     $root: $("#root"),
        //     $content: $(".content", $root),
        //     $contentImg: $("img", $content),
        //     $mask: $(".mask", $content),
        //     $scaleContent: $(".scale-content", $root),
        //     $scaleContentImg: $("img", $scaleContent),
        //     $corridorImgs: $(".corridor", $root).find("img")
        // };
            
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

