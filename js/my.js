

slideFn('slide1', 'slide_list', 'circle_nav1', 3000);
slideFn('slide2', 'slide_list', 'circle_nav2', 2000);
function slideFn(slideBoxName, slideUl, slideBtn, time) {
    var slide = mainNav.getElementsByClassName('slide')[0];
    var slideBox = slide.getElementsByClassName(slideBoxName)[0];
    var slideList = slideBox.getElementsByClassName(slideUl)[0]
    var circleButtons = slideBox.getElementsByClassName(slideBtn)[0].getElementsByTagName('li');//取得圆点
    var slideListLi = slideList.getElementsByTagName('li')
    var prev = slideBox.getElementsByClassName('prev')[0];
    var next = slideBox.getElementsByClassName('next')[0];

    var nowIndex = 0; //控制小圆点的索引
    var num = 1;//为了实现无缝
    var lens = slideListLi.length
    var left = parseInt(slideList.style.left)
    var slideTimer = null;
    var animated = false;  //当前是否在运动中，解决连续多次点击的bug;

    slideList.style.width = slideListLi[0].offsetWidth * lens + 'px'

    slideBox.onmouseover = function () {
        clearInterval(slideTimer)
        prev.style.display = 'block';
        next.style.display = 'block';

    };

    slideBox.onmouseout = function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        slideTimer = setInterval(function () {
            toNext();
        }, time)
    };

    next.onclick = function () {
        if (!animated) {
            toNext();
        }
    };
    prev.onclick = function () {
        if (!animated) {
            toPrev();
        }
    }
    //圆点的切换
    function showCircle(index) {
        for (var i = 0; i < circleButtons.length; i++) {
            circleButtons[i].className = '';
        }
        circleButtons[index].className = 'active'
    }
    //每个小圆点的点击切换
    for (var i = 0; i < circleButtons.length; i++) {
        circleButtons[i].index = i;
        circleButtons[i].onclick = function () {
            nowIndex = this.index;  //同时小圆点的索引值也要对应;
            num = this.index + 1;   //index 是从0开始的
            for (var i = 0; i < circleButtons.length; i++) {
                circleButtons[i].className = '';
            }
            this.className = 'active';
            startMove(slideList, { left: -520 * (this.index + 1) }, 7, 30);
            if (obj) {
                slideSpan.innerHTML = this.index + 1;
            }
        }
    }
    //自动播放
    slideTimer = setInterval(function () {
        toNext();
    }, time);

    function toNext() {
        animated = true;
        num++;
        if (nowIndex === circleButtons.length - 1) {
            nowIndex = 0;
        } else {
            nowIndex++;
        }

        showCircle(nowIndex);
        startMove(slideList, { left: -num * 520 }, 7, 30, function () {
            if (num >= lens - 1) {
                num = 1;
                slideList.style.left = '-520px';
            }
            animated = false;
        })
    };

    function toPrev() {
        animated = true;
        num--;
        if (nowIndex === 0) {
            nowIndex = circleButtons.length - 1;
        } else {
            nowIndex--;
        }
        if (obj) {
            obj.innerHTML = nowIndex + 1;
        }
        showCircle(nowIndex);
        startMove(slideList, { left: -num * 520 }, 7, 30, function () {
            if (num <= 0) { //当图片走到第五张图片的副本时，就让副本图片变成真正的第五张所在位置;
                num = lens - 2;
                slideList.style.left = -num * 520 + 'px';
            };
            animated = false;
        });
    }
}