// 封装商品筛选模块
let shopFilterModule = (() => {

    // 获取目标元素
    let $choose = $("#choose"),
        $type = $("#type"),
        $a = null;

    // 模拟数据
    let chooseData = [{
        typeId: 1,
        name: '华为',
    }];

    let typeData = [
        {
            id: 1,
            name: "品牌",
            content: ['苹果', '华为', '小米', '锤子', '魅族', '三星', "OPPO"]
        }, {
            id: 2,
            name: "尺寸",
            content: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
        }, {
            id: 3,
            name: "系统",
            content: ["安卓 ( Android )", "苹果 ( IOS )", "微软 ( WindowsPhone )", "无", "其他"
            ]
        }, {
            id: 4,
            name: "网络",
            content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"
            ]
        }
    ];

    // 渲染视图 (mark 标签区域)
    let _chooseRender = function _chooseRender() {
        let str = ``;
        chooseData.sort((a, b) => a.typeId - b.typeId);
        $(chooseData).each((_, item) => {
            // 拼接 dom 节点标签
            const { typeId, name } = item;
            str += `
                <mark>
                    ${ name}
                    <a href="javascript:;" data-id=${ typeId}>x</a>
                </mark>
            `;
        });
        $choose.html(str);
        _bindRmEvToView();
    };

    // 渲染视图 (items 内容区域)
    let _typeRender = function _typeRender() {
        let str = ``;
        $(typeData).each((_, item) => {
            const { id, name, content } = item;
            str += `<li>`;
            str += `${name}`;
            $(content).each((_, item) => {
                str += `<a href="javascript:;" data-id=${id}>${item}</a>`;
            });
            str += `</li>`;
        });
        $type.html(str);
        $a = $type.find("a");
    };

    // 绑定添加标签事件到视图
    let _bindAddEvToView = function _bindAddEvToView() {
        $a.on('click', function () {
            let obj = {
                typeId: Number.parseInt($(this).attr("data-id")),
                name: $(this).html(),
            };
            chooseData = $(chooseData).filter((_, item) => item.typeId !== obj.typeId);
            chooseData.push(obj);
            _chooseRender();
        });
    };

    // 绑定移除标签事件到视图
    let _bindRmEvToView = function _bindRmEvToView() {
        $choose.find("a").on('click', function () {
            // 获取 typeId
            let typeId = Number.parseInt($(this).attr("data-id"));
            chooseData = $(chooseData).filter((_, item) => item.typeId !== typeId);
            _chooseRender();
        });
    };

    return {
        init() {
            _chooseRender();
            _typeRender();
            _bindAddEvToView();
           
        },
    };
})();
shopFilterModule.init();