function Role() {
    this.main = document.createElement('div');
    this.main.className = 'role';

    this.diffTop = oC2.offsetTop;
    this.diffLeft = oC2.offsetLeft;
    this.disX = oC2.offsetHeight;
    this.disY = oC2.offsetWidth + 1;

    this.x = 15;
    this.y = -1;


    document.body.appendChild(this.main);
}

Role.prototype.update = function() {
    this.x0 = this.x - 2;
    this.x2 = this.x + 2;

    this.y0 = this.y - 2;
    this.y2 = this.y + 2;

    this.main.style.top = this.diffTop + this.x - 4 + 'px';
    this.main.style.left = this.diffLeft + this.y - 8 + 'px';

};

Role.prototype.isWall = function(cx, cy) {
    var points = [];
    var ret;
    var retX = true,
        retY = true;
    if(cx === -1) {
        points.push({
            x: this.y0,
            y: this.x0
        }, {
            x: this.y0,
            y: this.x2
        });

        if(cy === -1) {
            points.push({
                x: this.y2,
                y: this.x0
            });
        } else {
            points.push({
                x: this.y2,
                y: this.x2
            });
        }
    } else {
        points.push({
            x: this.y2,
            y: this.x0
        }, {
            x: this.y2,
            y: this.x2
        });

        if(cy === -1) {
            points.push({
                x: this.y0,
                y: this.x0
            });
        } else {
            points.push({
                x: this.y0,
                y: this.x2
            });
        }
    }

    for(var i = 0; i < 3; i++) {
        ret = this.pointCheck(points[i].x, points[i].y, cx, cy);

        if(!ret.x) {
            retX = false;
        }

        if(!ret.y) {
            retY = false;
        }

        if(!retX && !retY) {
            break ;
        }
    }

    return {
        x: retX,
        y: retY
    };
};

Role.prototype.pointCheck = function(x, y, cx, cy) {
    var start, r;
    var retX = true,
        retY = true;

    x = x >> 0;
    y = y >> 0;

    x += ((1 * cx) >> 0);

    if(x > 0 && x<390 && y > 0 && y<290) {
        start = y * width * 4 + x * 4;
        r = pixData[start];
        if(r === 0) {
            retX = false;
        }
    }

    x -= (1 * cx);
    y += (1 * cy);
    if(y > 0 && x<390 && x > 0 &&y<290) {
        start = y * width * 4 + x * 4;
        r = pixData[start];
        if(r === 0) {
            retY = false;
        }
    }

    return {
        x: retX,
        y: retY
    };
};

Role.prototype.check = function(x, y, z, cx, cy) {
    var ret, data;
    x = (x/2+0.05) * this.disX;
    y = (y) * this.disY;

    cx = Math.abs(cx) < 0.01 ? 0 : cx / Math.abs(cx);
    cy = Math.abs(cy) < 0.01 ? 0 : cy / Math.abs(cy);

    ret = this.isWall(cy, cx);

    data = {
        x: (ret.y|| z<-6) ? x : 0,
        y: (ret.x|| z<-6) ? y : 0
    };

    return data;
};

Role.prototype.hide = function() {
    c2d.style.opacity = 0;
    this.main.style.opacity = 0;
};

Role.prototype.show = function() {
    c2d.style.opacity = 1;
    this.main.style.opacity = 1;
};

var role = new Role();
role.update();