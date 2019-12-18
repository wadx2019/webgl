function help() {
    alert("欢迎来到，神奇宝贝的迷宫花园\n" +
        "我是您的向导小智，下面由我来为您来介绍本游戏的帮助说明！");
    alert("移动↑↓←→：W、S、A、D\n" +
        "跳跃：space\n" +
        "飞行：Y\n" +
        "卧倒：U\n" +
        "加速：按住鼠标左键不松\n" +
        "转向：鼠标移动");
    alert("介绍结束，祝您游戏愉快！\n" +
        "PS：按下F11进入全屏，体验更佳哟！")

}
var LEFT = 65,
    UP = 87,
    RIGHT = 68,
    DOWN = 83,
    KEYS = {};
var speed=0.2;
document.onmousedown = function(){
    speed=0.4;
}
document.onmouseup = function(){
    speed=0.2;
}
document.onkeydown = function(e) {
    KEYS[e.keyCode] = true;
};
document.onkeyup = function(e) {
    KEYS[e.keyCode] = false;
};
document.onkeypress=function(e){
    if((e.keyCode == 89|| e.keyCode==121)&& (state==0||state==2))
    {
        fly=!fly;
        if(fly) {
            camera.y = -15;
            state=2;
        }
        else {
            var ret=role.isWall(0,0);
            if(ret.x && ret.y)
                camera.y = 1;
            else
                camera.y=-7.01;
            state=0;
        }
    }
    if((e.keyCode==85 || e.keyCode == 117)&&(state==0||state==3)&&camera.y>-3)
    {
        drop=!drop;
        if(drop) {
            camera.y = 4;
            state=3;
        }
        else {
            camera.y = 1;
            state=0;
        }
    }
    if(t-0<0.00001) {
        if (e.keyCode == 32 && state==0) {
            state=1;
            jmp = setInterval(function () {
                camera.y -= 1.52 - 0.3 * t;
                ret=role.isWall(0,0);
                if(camera.y<-7.6)
                    ctl=true;
                if ((camera.y>=1||((!ret.x||!ret.y)&&camera.y>-7.6))&&ctl) {
                    t=-0.3;
                    ctl=false;
                    console.log(camera.y);
                    clearInterval(jmp);
                    state=0;
                }
                t += 0.3;
            }, 32);
        }
    }
}
document.onmousemove = function(e) {
    var x = e.clientX;
    if(e.clientX <= 2) {
        camera.rot += -0.05;
    } else if(e.clientX >= window.innerWidth - 2) {
        camera.rot += 0.05;
    } else {
        camera.rot += ((x - globalRot) / 100);
    }
    globalRot = x;
};


window.onscroll=function(){
    role.diffTop = oC2.offsetTop;
    role.diffLeft = oC2.offsetLeft;
    role.disX = oC2.offsetHeight;
    role.disY = oC2.offsetWidth + 1;
    role.update();
}
window.onresize=function () {
    role.diffTop = oC2.offsetTop;
    role.diffLeft = oC2.offsetLeft;
    role.disX = oC2.offsetHeight;
    role.disY = oC2.offsetWidth + 1;
    role.update();
}