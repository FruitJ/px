// JTab 整体架构 :

void (function () {

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
        };
        constructor(selector, config) { // 初始化 JTab
            Tab.initParams(selector, config);
        }
    }

    class Tab {
        static initParams(selector, config) {

            // 检查参数的合法性

            // 定义 module 信息

            // 挂载阶段

            // 动态创建子类实例【动态选择选项卡模型】

        }
        constructor() {
            // 挂载默认配置项

            // 合并配置项(默认配置与自定义配置)

            // 挂载工具方法

            // 挂载子类通用方法

        }
    }

    class DefaultTab extends Tab {

        constructor() {
            super();
            init();
        }
        init() { // default tab entrance

        }
    }

    window.JT = window.JTab = JTab;
})();

