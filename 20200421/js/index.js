        let timer = null; // 定时器标识
        const NUM = 5, // 图片数量
            WIDTH = box.offsetWidth, // 轮播图适口大小
            ALL_WIDTH = NUM * WIDTH; // 轮播舞台总长度
        let ul = document.querySelector('ul'),
            start = -WIDTH, // 起始位置
            count = 1, // 底部小圆灯起始索引
            prev = document.querySelector(".prev"), // 上一个【按钮】
            next = document.querySelector(".next"), // 下一个【按钮】
            lamps = [...document.querySelectorAll(".lamp li")]; // 底部小圆灯
        // 移动
        function move() {
            timer = setInterval(() => {
                lampPosition(NUM, 1);
                fn(true);
            }, 2000);
        }
        move();

        function fn(flag) {
            if (flag) {
                if (start < -ALL_WIDTH) {
                    start = -WIDTH;
                    changeSliderStyle(ul, start, false);
                    console.log(ul.offsetHeight);
                }
                start -= WIDTH;
                changeSliderStyle(ul, start);
            } else {

                if (start === 0) { // 第一张
                    start = -ALL_WIDTH;
                    changeSliderStyle(ul, start, false);
                    console.log(ul.offsetHeight);
                }
                start += WIDTH;
                changeSliderStyle(ul, start);
            }
        }
        // 改变滑块样式
        function changeSliderStyle(element, val, isUsed = true) {
            element.style.transition = isUsed ? 'all .8s' : 'none';
            element.style.transform = `translateX(${val}px)`;
        }
        // 改变圆灯样式
        function changeLampStyle() {
            this.className = "active";
            lamps.forEach((item, index) => {
                if (this !== item) {
                    item.className = "visited";
                }
            });
        }
        // 改变圆灯偏移
        function lampPosition(judge, val, flag = true) {
            if (flag) {
                count++
                count > judge ? count = val : null;

            } else {
                count--
                count <= judge ? count = val : null;
            }
            changeLampStyle.apply(lamps[count - 1]);
        }
        function eventHandler(judge, val, flag = true) {
            lampPosition(judge, val, flag);
            clearInterval(timer);
            fn(flag);
            move();
        }
        // 点击底部小圆灯行为
        lamps.forEach((item, index) => {
            item.dataset.index = index + 1;
            item.addEventListener('click', function () {
                // 清除定时器
                clearInterval(timer);
                // 定位
                let n = Number(item.dataset.index);
                count = n;
                start = n * -WIDTH;
                changeLampStyle.apply(this);
                changeSliderStyle(ul, start);
                // 重启定时器
                move();
            }, false);
        });
        // 左右按钮控制区域
        next.addEventListener('click', function () {
            eventHandler(NUM, 1);
        }, false);
        prev.addEventListener('click', function () {
            eventHandler(0, NUM, false);
        }, false);