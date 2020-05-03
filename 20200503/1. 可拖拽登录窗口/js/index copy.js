let dragModule = (function () {

    // 获取目标元素
    let signIn = document.querySelector("#signIn"),
        mask = document.querySelector(".mask"),
        dialog = document.querySelector(".dialog"),
        close = dialog.querySelector(".close");
        let obj = {
            initX: 0,
            initY: 0,
            dialog_l: 0,
            dialog_t: 0,
        };
        // 获取目标元素
        let title = dialog.querySelector(".title");
        let max_w = document.documentElement.clientWidth - Number.parseFloat(window.getComputedStyle(dialog, null)["width"]),
            max_h = document.documentElement.clientHeight - Number.parseFloat(window.getComputedStyle(dialog, null)["height"]);
            console.log(max_w, max_h);
            
    let utils = {
        fadeInOut(status) {
            mask.style.display = status;
            dialog.style.display = status;
        },
        move(e) {
            e = e || window.event;
            // 获取鼠标偏移距离
            let distanceL = e.pageX - obj.initX + obj.dialog_l,
                distanceT = e.pageY - obj.initY + obj.dialog_t;
            console.log(distanceL, distanceT);
            if(distanceL <= 0) {
                distanceL = 0;
            }
            if(distanceL>= max_w) {
                distanceL = max_w;
            }
            if(distanceT <= 0) {
                distanceT= 0;
            }
            if(distanceT >= max_h) {
                distanceT= max_h;
            }

            dialog.style.cssText = `
                display: block;
                position: absolute;
                z-index: 220;
                left: ${ distanceL}px;
                top: ${ distanceT}px;
            `;
        },
        up() {
            console.log(utils);
            
            window.removeEventListener('mousemove', utils.move, false);
            window.removeEventListener('mouseup', utils.up, false);
        }
    };

    // SignIn Action
    let _signIn = function _signIn() {
        signIn.addEventListener('click', function () {
            utils.fadeInOut("block");
        }, false);
    };

    // SignIn Action end
    // let _end = function _end() {
    //     close.addEventListener('click', function () {
    //         utils.fadeInOut("none");
    //     }, false);
    // };

    let _drag = function _drag() {
        utils.fadeInOut("block");
        
       
        function down(ev) {
            ev = ev || window.event;
            // 获取鼠标偏移量(初始)
            obj.initX = ev.pageX;
            obj.initY = ev.pageY;
            obj.dialog_l = Number.parseFloat(window.getComputedStyle(dialog, null)["left"]);
            obj.dialog_t = Number.parseFloat(window.getComputedStyle(dialog, null)["top"]);
            window.addEventListener('mousemove', utils.move, false);
            window.addEventListener('mouseup', utils.up, false);
        }
        title.addEventListener('mousedown', down, false);
    };
    return {
        init() {
            _signIn();
            // _end();
            _drag();
        },
    }
})();
dragModule.init();