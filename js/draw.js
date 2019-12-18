for(var i=0;i<100;i++)
{
    var x1=(1*i/100) - 0.5;
    var x2=(1*(i+1)/100) - 0.5;
    for(j=0;j<145;j++)
    {
        k1=(1*j/145) - 0.5;
        k2=(1*(j+1)/145) - 0.5;
        po_data.push.apply(po_data,[
            x1*120+0.01 , -1.1 , k1*120,
            x2*120+0.01 , -1.1 , k1*120,
            x2*120+0.01 , -1.1 , k2*120,
            x1*120+0.01 , -1.1 , k2*120
        ]);
        count +=6;
        for(k=0;k<5;k++)
        {
            index_data.push(s,s+1,s+2,s+2,s+3,s);
            s+=4;
        }
        mp_data.push.apply(mp_data,[
            2.0, 0.0,
            0.0, 0.0,
            0.0, 2.0,
            2.0, 2.0,
        ]);
    }
}
var ground = Object.create(null);
ground.count=count;
ground.poBuf=webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER,ground.poBuf);
webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(po_data), webgl.STATIC_DRAW);

ground.mpBuf = webgl.createBuffer();

webgl.bindBuffer(webgl.ARRAY_BUFFER, ground.mpBuf);
webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(mp_data), webgl.STATIC_DRAW);

ground.indexBuf = webgl.createBuffer();

webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, ground.indexBuf);
webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index_data), webgl.STATIC_DRAW);


maze.wallList=[];
for(var tot=0;tot<=3;tot++) {
    s=0;
    count=0;
    po_data = [];
    index_data = [];
    mp_data = [];
    // k1和k2算作Z轴
    for (i = 0; i < rowWall[tot].length; i += 10) { // rowWall.length
        item = rowWall[tot][i];
        while ((tmp = item.pop())) {
            k1 = (2 * i / height) - 1;
            k2 = (2 * (i + 10) / height) - 1;
            po_data.push.apply(po_data, [
                tmp.x1 * 120 + 0.01, -1.09, k1 * 120, // 左下
                tmp.x2 * 120 + 0.01, -1.09, k1 * 120, // 右下
                tmp.x2 * 120 + 0.01, 0.2, k1 * 120, // 右上
                tmp.x1 * 120 + 0.01, 0.2, k1 * 120, // 左上

                tmp.x2 * 120 + 0.01, -1.09, k1 * 120,
                tmp.x2 * 120 + 0.01, -1.09, k2 * 120,
                tmp.x2 * 120 + 0.01, 0.2, k2 * 120,
                tmp.x2 * 120 + 0.01, 0.2, k1 * 120,

                tmp.x1 * 120 + 0.01, -1.09, k2 * 120,
                tmp.x2 * 120 + 0.01, -1.09, k2 * 120,
                tmp.x2 * 120 + 0.01, 0.2, k2 * 120,
                tmp.x1 * 120 + 0.01, 0.2, k2 * 120,

                tmp.x1 * 120 + 0.01, -1.09, k1 * 120,
                tmp.x1 * 120 + 0.01, -1.09, k2 * 120,
                tmp.x1 * 120 + 0.01, 0.2, k2 * 120,
                tmp.x1 * 120 + 0.01, 0.2, k1 * 120,

                tmp.x1 * 120 + 0.01, 0.2, k1 * 120,
                tmp.x2 * 120 + 0.01, 0.2, k1 * 120,
                tmp.x2 * 120 + 0.01, 0.2, k2 * 120,
                tmp.x1 * 120 + 0.01, 0.2, k2 * 120
            ]);

            count += (6 * 5);

            for (k = 0; k < 5; k++) {
                index_data.push(s, s + 1, s + 2, s + 2, s + 3, s);
                s += 4;
            }

            mp_data.push.apply(mp_data, [
                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,


                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,

                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,

                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,

                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0
            ]);
        }
    }

    maze.wallList[tot] = Object.create(null);
    maze.wallList[tot].count = count;

    maze.wallList[tot].poBuf = webgl.createBuffer();

    webgl.bindBuffer(webgl.ARRAY_BUFFER, maze.wallList[tot].poBuf);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(po_data), webgl.STATIC_DRAW);

    maze.wallList[tot].mpBuf = webgl.createBuffer();

    webgl.bindBuffer(webgl.ARRAY_BUFFER, maze.wallList[tot].mpBuf);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(mp_data), webgl.STATIC_DRAW);

    maze.wallList[tot].indexBuf = webgl.createBuffer();

    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, maze.wallList[tot].indexBuf);
    webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index_data), webgl.STATIC_DRAW);
}



webgl.uniformMatrix4fv(
    uPMatrix, false, (function(a, r, n, f){
        a = 1 / Math.tan(a * Math.PI / 360);

        return [
            a/r, 0, 0, 0,
            0, a, 0, 0,
            0, 0, -(f+n)/(f-n), -1,
            0, 0, -2*f*n/(f-n), 0
        ];
    })(90, c2d.width/c2d.height, 0.1, 100)
);

webgl.enable(webgl.DEPTH_TEST);

var imgGround = new Image();
var img = [];

imgGround.onload = function () {
    ground.texture = webgl.createTexture();
    webgl.activeTexture(webgl.TEXTURE0);
    webgl.bindTexture(webgl.TEXTURE_2D, ground.texture);
    webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);

    webgl.texImage2D(
        webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, imgGround
    );

    webgl.generateMipmap(webgl.TEXTURE_2D);

    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);

    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.MIRRORED_REPEAT);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.MIRRORED_REPEAT);

    webgl.uniform1i(uTex, 0);

    webgl.bindTexture(webgl.TEXTURE_2D, null);

    imgGround.loaded = true;

    if(imgGround.loaded) {
        setInterval(function() {
            draw(a);
        }, 1024);
    }
};
function imgConfig(tot) {
    return function() {
        maze.wallList[tot].texture = webgl.createTexture();
        webgl.activeTexture(webgl.TEXTURE0);
        webgl.bindTexture(webgl.TEXTURE_2D, maze.wallList[tot].texture);
        webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);

        webgl.texImage2D(
            webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, img[tot]
        );

        webgl.generateMipmap(webgl.TEXTURE_2D);

        webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
        webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);

        webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.MIRRORED_REPEAT);
        webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.MIRRORED_REPEAT);

        webgl.uniform1i(uTex, 0);

        webgl.bindTexture(webgl.TEXTURE_2D, null);

        img[tot].loaded = true;

        if (img[tot].loaded) {
            setInterval(function () {
                draw(a);
            }, 32);
        }
    }
}
for(tot=0;tot<=3;tot++) {
    img[tot] = new Image();
    img[tot].onload = imgConfig(tot);
}

img[0].src = 'img/皮卡丘.jpg';
img[1].src = 'img/可达鸭.jpg';
img[2].src = 'img/胖丁.jpg';
img[3].src = 'img/伊布.jpg';
imgGround.src='img/草地.jpg';

var a = Math.PI / 2;

function draw(a) {
    if(KEYS[UP])
        camera.move({x:speed,y:0.0});
    if(KEYS[DOWN])
        camera.move({x:-speed,y:0.0});
    if(KEYS[LEFT])
        camera.move({x:0.0,y:speed});
    if(KEYS[RIGHT])
        camera.move({x:0.0,y:-speed});
    // 绘制地板
    drawGround();
    // 绘制迷宫
    drawMaze(a);
    if(Math.sqrt((role.x-280)*(role.x-280)+(role.y-380)*(role.y-380))<=10 && success)
    {
        if(confirm("恭喜，到达出口！\n" +
            "是否，重新开始？"))
            location.reload();
        success=false;
    }
}

function drawMaze(a) {
    var s = Math.sin(a);
    var c = Math.cos(a);

    webgl.uniformMatrix4fv(
        uMVMatrix, false, [1 * c,0,-1 * s,0, 0,5,0,0, 1 * s,0,1 * c,0, 107.5,0,-120.5,1]
    );

    webgl.uniformMatrix4fv(
        uCMVMatrix, false, camera.toMatrix()
    );

    webgl.uniformMatrix4fv(
        uCRMatrix, false, [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
    );

    webgl.uniform1i(isMaze, true);
    for(var tot=0;tot<=3;tot++) {
        webgl.bindBuffer(webgl.ARRAY_BUFFER, maze.wallList[tot].poBuf);
        webgl.vertexAttribPointer(aVertex, 3, webgl.FLOAT, false, 0, 0);

        webgl.bindBuffer(webgl.ARRAY_BUFFER, maze.wallList[tot].mpBuf);
        webgl.vertexAttribPointer(aMp, 2, webgl.FLOAT, false, 0, 0);
        webgl.activeTexture(webgl.TEXTURE0);
        webgl.bindTexture(webgl.TEXTURE_2D, maze.wallList[tot].texture);

        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, maze.wallList[tot].indexBuf);

        webgl.drawElements(webgl.TRIANGLES, maze.wallList[tot].count, webgl.UNSIGNED_SHORT, 0);
    }
}

function drawGround() {
    webgl.uniformMatrix4fv(
        uMVMatrix, false, [15,0,0,0, 0,5,0,0, 0,0,15,0, 0,0,-100,1]
    );

    webgl.uniformMatrix4fv(
        uCMVMatrix, false, camera.toMatrix()
    );

    webgl.uniformMatrix4fv(
        uCRMatrix, false, [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
    );

    webgl.uniform1i(isMaze, true);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, ground.poBuf);
    webgl.vertexAttribPointer(aVertex, 3, webgl.FLOAT, false, 0, 0);

    webgl.bindBuffer(webgl.ARRAY_BUFFER, ground.mpBuf);
    webgl.vertexAttribPointer(aMp, 2, webgl.FLOAT, false, 0, 0);
    webgl.activeTexture(webgl.TEXTURE0);
    webgl.bindTexture(webgl.TEXTURE_2D, ground.texture);

    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, ground.indexBuf);

    webgl.drawElements(webgl.TRIANGLES, ground.count, webgl.UNSIGNED_SHORT, 0);
}
