void (function () {

    let utils = { // 工具方法
        checkType(param) { // 检测数据类型
            if (param === null)`${null}`;
            let type = typeof param;
            if (type !== "object" && type !== "function") return type;
            let str = ({}).toString.call(param);
            return str.substring(str.indexOf(" ") + 1, str.lastIndexOf("]")).toLowerCase();
        },
        mergeParams(target, attach) { // 参数合并
            const { checkType } = utils;
            for (let key in attach) {
                if (!attach.hasOwnProperty(key)) break;
                let val1 = target[key],
                    val2 = attach[key];
                if (checkType(val1) === "object" && checkType(val2) === "object") {
                    target[key] = utils.mergeParams(val1, val2);
                }
                target[key] = val2;
            }
            return target;
        },
        isFunction(params) { // 判断函数类型
            return typeof params === "function" && typeof params.nodeType !== "number";
        },
        getElement(params) { // 获取指定 dom 节点
            if (params.nodeType) return params;
            return document.querySelector(params);
        },
        getComputedStyle(ele, attr) {
            let val = window.getComputedStyle(ele, null)[attr];
            let reg = /^\d+\.?\d+(px|em|rem)$/;
            if (reg.test(val)) {
                val = Number.parseFloat(val);
            }
            return val;
        }
    };

    class JTab {

        static alias = { // 别名【快捷方式】
            MODULE_DEFAULT: "defaultTab",
            POS_NONE: "none",
            POS_TOP: "top",
            POS_LEFT: "left",
            POS_RIGHT: "right",
            POS_BOTTOM: "bottom",
            OVERFLOW_AUTO: "auto",
            OVERFLOW_HIDDEN: "hidden",
            PAGECARD_POS_VERTICAL: "vertical",
            PAGECARD_POS_HORIZONTAL: "horizontal",
        };
        constructor(selector, config) { // 初始化 JTab
            let instance = Tab.initParams(selector, config);
            if(instance){
                this.root = utils.getElement(selector);
                this.lifeCycle = config.lifeCycle;
                this.instance = instance;
            }
        }

        destroy() {
            if(utils.checkType(this.lifeCycle) === "object" && utils.isFunction(this.lifeCycle.componentWillUnMount)){
                this.lifeCycle.componentWillUnMount.call(this.instance, "active", this.root);
            }
            this.root.parentNode.removeChild(this.root);
            if(utils.checkType(this.lifeCycle) === "object" && utils.isFunction(this.lifeCycle.componentDidUnMount)){
                this.lifeCycle.componentDidUnMount("destroy");
            }
        }
    }

    class Tab {
        static moduleNames = ["defaultTab"];
        static tabClassNames = ["default-tab"];
        static initParams(selector, config) {
            const { checkType } = utils;
            // 检查参数的合法性
            if (checkType(selector) !== "string" && !selector.nodeType) throw new TypeError("Please pass in selector or DOM node.");
            if (checkType(config) !== "object") throw new TypeError("Please pass in parameter configuration object.");
            if (checkType(config.module) !== "string" && config.module != null) throw new TypeError("Please pass in the correct module parameter.");
            let modules = [DefaultTab];
            Tab.index = Tab.moduleNames.indexOf(config.module);


            // 动态创建子类实例【动态选择选项卡模型】
            return config.module == null || Tab.index === -1 ? new DefaultTab(selector, config) : new modules[Tab.index](selector, config);
            
        }
        constructor(selector, config) {
            // 挂载默认配置项
            let defaults = {
                module: JTab.alias.MODULE_DEFAULT,
                InitialIndex: 0,
                style: { // 选项卡样式
                    pageCard: { // 页卡部分
                        pos: JTab.alias.POS_TOP, // 页卡位置
                        size: { // 页卡尺寸
                            width: 420,
                            height: 42,
                        },
                    },
                    boards: { // 面板部分
                        pic: { // 图片区域
                            size: { // 图片尺寸
                                width: 200,
                            }
                        },
                        typesetting: JTab.alias.POS_TOP, // 内容区域
                        overflow: JTab.alias.OVERFLOW_AUTO,
                    },
                },
                data: [],
                advancedOptions: { // 高级选项

                },
                isReplaceSkin: false, // 是否换肤    
                isMusic: false, // 是否播放音乐
                lifeCycle: {
                    componentDidMount() { // 组件已挂载

                    },
                    componentWillUnMount() { // 组件卸载前

                    },
                    componentDidUnMount() { // 组件卸载后

                    }
                },
            };
            // 合并配置项(默认配置与自定义配置)
            let res = utils.mergeParams(defaults, config);
            // 处理选择器(selector)
            let container = utils.getElement(selector);
            // 挂载阶段
            this.config = res;
            this.root = container;
            this.index = Tab.index === -1 ? 0 :
                this.boardsBox = null;
            this.pageCardsBox = null;
            Tab.index;
            // 挂载子类通用方法
            this.controller();
            // 生命周期方法【组件已挂载】 (lifeCycle - componentDidMount)
            let { lifeCycle } = this.config;
            if(utils.checkType(lifeCycle) === "object" && utils.isFunction(lifeCycle.componentDidMount)){
                lifeCycle.componentDidMount.call(this, "active", this.root);
            }
        }
        controller() {
            this.initTabNodes();
            this.initTabStyle();
        }
        initTabNodes() {
            const { root, config: { data, style: { boards, pageCard } } } = this;
            // 生成 dom 结构 tabClassNames

            let str = `<ul class="JTab-tabs ${Tab.tabClassNames[this.index]}-pageCard">`,
                contentStr = `<div class="JTab-boards ${Tab.tabClassNames[this.index]}-boards">`;
            let contentPicWidth = boards.pic.size.width;


            data.forEach((item, index) => {
                let realWidth = !!contentPicWidth ? contentPicWidth : item.contentPicsSize.width;
                let realHeight = !!contentPicWidth ? (contentPicWidth * item.contentPicsSize.height) / item.contentPicsSize.width : item.contentPicsSize.height;
                str += `
                    <li>
                        <a href="###">${
                    !!item.titleIconUri && typeof item.titleIconUri === "string" ? '<i class="icon iconfont">' + item.titleIconUri + '</i>' : ""

                    }
                            ${ item.title}
                        </a>
                    </li>
                `;
                contentStr += `
                    <div>
                    ${
                    !!boards.typesetting && boards.typesetting === JTab.alias.POS_TOP ? "<p>" + item.content + "</p>" : ""
                    }
                    ${
                    (!!item.contentPicUri && typeof item.contentPicUri === "string") && (utils.checkType(item.contentPicsSize) === "object") ? "<img src=" + item.contentPicUri + " style='width: " + realWidth + "px;height: " + realHeight + "px;'>" : ""

                    }
                    ${
                    !!boards.typesetting && boards.typesetting === JTab.alias.POS_BOTTOM ? "<p>" + item.content + "</p>" : ""
                    }
                    </div>    
                `;
            });
            str += `</ul>${contentStr}</div>`;
            this.root.innerHTML = str;

        }
        initTabStyle() {
            const { root, config: { data, style: { boards, pageCard } } } = this;
            // 获取目标元素
            let pageCardBox = this.root.querySelector(`.${Tab.tabClassNames[this.index]}-pageCard`);
            let boardsBox = this.root.querySelectorAll(`.${Tab.tabClassNames[this.index]}-boards div`);
            this.boardsBox = boardsBox;
            this.pageCardsBox = pageCardBox.querySelectorAll("li");

            const { width, height } = pageCard.size;

            if (pageCard.pos !== JTab.alias.PAGECARD_POS_VERTICAL) { // horizontal

                pageCardBox.style.cssText = `
                                width: ${ width}px;
                                height: ${ height}px;
                            `;
                this.root.style.width = `${width}px`;
            } else { // vertical

                let w = width / 2 + height / 2;
                let h = width + height;

                this.root.style.cssText = `
                                position: relative;
                                height: ${h}px;
                            `;
                pageCardBox.style.cssText = `
                                position: absolute;
                                transform-origin: center center;
                                transform: rotate(90deg);
                                top: ${ w - height}px;
                                right: -${ w}px;
                                width: ${width}px;
                            `;
            }


        }
    }

    class DefaultTab extends Tab {

        constructor(selector, config) {
            super(selector, config);
            this.init();
        }
        init() { // default tab entrance
            this.cutTab();
            this.replaceSkin();
            this.playMusic();
        }
        cutTab() {
            let { InitialIndex, data, } = this.config;
            // 获取目标元素 pageCardsBox boardsBox
            let num = Math.abs(Number(InitialIndex));
            let index = Number.isNaN(num) ? 0 : num > data.length - 1 ? 0 : num;
            this.pageCardsBox[index].className = "active";
            this.boardsBox[index].className = "active";
            let prevTab = this.pageCardsBox[index],
                prevBoard = this.boardsBox[index],
                that = this;
            [...this.pageCardsBox].forEach((item, index) => {
                item.addEventListener('click', function () {
                    if (prevTab !== null) {
                        prevTab.className = "close";
                        prevBoard.className = "close";
                    }
                    this.className = "active";
                    that.boardsBox[index].className = "active";
                    prevTab = this;
                    prevBoard = that.boardsBox[index];
                }, false);
            });
        }
        replaceSkin() {
            let that = this;
            let bgColors = ["#F3F9F1", "#EEDEB0", "#FAFF72", "#1BD1A5", "#C91F37", "#EDD1D8", "#FFF"];
            let count = 0;
            document.addEventListener('keydown', function (ev) {
                ev = ev || window.event;
                ev.preventDefault();
                if(!!that.config.isReplaceSkin) {
                    if (ev.ctrlKey === true && ev.keyCode === 82) {
                        count = count > bgColors.length - 1 ? 0 : count;
    
                        // 获取当前激活的 tab
                        let targetCardBox = [...that.pageCardsBox].filter((item) => item.className.includes("active"))[0];
                        let targetBoardBox = [...that.boardsBox].filter((item) => item.className.includes("active"))[0];
    
                        targetCardBox.style.backgroundColor = bgColors[count];
                        targetCardBox.style.borderBottomColor = bgColors[count];
                        targetBoardBox.style.backgroundColor = bgColors[count];
                        count++;
                    }
                }
                
            }, false);
        }
        playMusic() {
            let that = this;
            const { music } = that.config;
            if (!!music.isMusic && music.musicQueue.length > 0) { // 可播放(目前只提供播放一首)
                let audio = document.createElement("audio");
                audio.src = music.musicQueue[0];
                audio.style.width = "0px";
                audio.style.height = "0px";
                this.root.appendChild(audio);

                // 播放
                document.addEventListener('keydown', function (ev) {
                    ev = ev || window.event;
                    if(ev.ctrlKey === true && ev.keyCode === 77) {
                        audio.play();
                    }
                }, false);

                // 暂停
                document.addEventListener('keydown', function (ev) {
                    ev = ev || window.event;
                    if(ev.ctrlKey === true && ev.keyCode === 80) {
                        audio.pause();
                    }
                }, false);

            }
        }
    }

    window.JT = window.JTab = JTab;
})();