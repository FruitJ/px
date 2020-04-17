let shopModule = (function () {
    let chooseBox = document.querySelector("#choose"),
        typeBox = document.querySelector("#type"),
        links = null;

    // 构建数据模型
    let chooseData = [
        {
            typeId: 1,
            name: '华为',
        }
    ];
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

    // 渲染数据
    let chooseRander = function chooseRander() {

        let str = `你的选择: `;
        chooseData.sort((a, b) => a.typeId - b.typeId).forEach(item => {
            str += `
            <mark>
            ${ item.name}
            <a href="javascript:;" data-id=${ item.typeId}>x</a>
        </mark>
            `;
        });

        chooseBox.innerHTML = str;
        handleClose();
    };

    let typeRander = function typeRander() {
        let str = ``;
        typeData.forEach(item => {
            let { id, name, content } = item;
            str += `<li>`;
            str += `${name}`;
            content.forEach((n, m) => {
                str += `
                    <a href="javascript:;" data-id=${ id}>${n}</a>
                `;
            });
            str += `</li>`;
        });
        typeBox.innerHTML = str;
        // 获取 links
        links = typeBox.querySelectorAll("a");
    };

    let handlelinks = function () {

        [...links].forEach(item => {
            item.addEventListener('click', function () {

                let obj = {
                    typeId: Number.parseInt(this.dataset.id),
                    name: this.innerText,
                };

                chooseData = chooseData.filter((item) => item.typeId !== obj.typeId);

                chooseData.push(obj);
                chooseRander();
            }, false);
        });

    };

    let handleClose = function handleClose() {

        let closeBtns = chooseBox.querySelectorAll("a");
        [...closeBtns].forEach(item => {
            item.addEventListener('click', function () {

                let typeId = Number.parseInt(this.dataset.id);
                chooseData = chooseData.filter((item) => item.typeId !== typeId);

                chooseRander();
            }, false);
        });
    };

    return {

        init() {
            chooseRander();
            typeRander();
            handlelinks();
        },
    };
})();
shopModule.init();