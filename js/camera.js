var cx, cy, ret;

var globalRot = window.innerWidth / 2;
var camera = {
    rot: 0,
    x: 0,
    y: 1,
    z: 0,
    move: function(e){
        // 移动时需要做朝向计算
        cx = Math.sin(-this.rot) * e.x-Math.sin(-this.rot-Math.PI/2)*e.y;
        cy = Math.cos(-this.rot) * e.x-Math.cos(-this.rot-Math.PI/2)*e.y;

        this.x += cx;
        this.z += cy;
        var ret=role.isWall(-Math.abs(cx) < 0.01 ? 0 : cx / Math.abs(cx),Math.abs(cy) < 0.01 ? 0 : cy / Math.abs(cy));
        if((ret.x || ret.y) && state==0)
        {
            this.y=1;
        }
        ret = role.check(-this.x/120, this.z/242,this.y,-cx, cy); // 后两个参数代表方向

        if(ret.x === 0) {
            this.x -= cx;
        } else {
            role.x = ret.x;
        }
        if(ret.y === 0) {
            this.z -= cy;
        } else {
            role.y = ret.y;
        }

        role.update();
    },
    toMatrix: function(){
        var s = Math.sin(this.rot),
            c = Math.cos(this.rot),
            x = this.x,
            z = this.z;
        y =  this.y;
        // 无Y轴相关变化
        return [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            c * x + s * z, y, c * z - s * x, 1
        ];
    }
};