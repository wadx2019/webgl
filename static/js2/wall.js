var rowWall = [];
var pixData;

getWall();

function getWall() {
    pixData = ctx.getImageData(0, 0, width, height).data;
    for(var tot=0;tot<=3;tot++) {
        getRowWall(tot,4);
    }
}

function getRowWall(t,sum) {
    var i = 0;
    var j = 0;
    var x1, x2;
    rowWall[t]=[];
    for(i=0; i <= height; i += 10) {
        rowWall[t][i] = [];
        for(j=0;j+10<=width;j+=10)
        {
            if(isBlack(j,i)&&isBlack(j+9,i)&&(Math.random()<1/(sum-t+1) || t==sum-1)){
                rowWall[t][i].push({
                    x1: 2 * (j / width) - 1,
                    x2: 2 * ((j+10) / width) - 1
                });
                visited[i][j]=true;

            }
        }
    }
}

function getPix(x, y) {
    var start = y * width * 4 + x * 4;
    var r = pixData[start];
    var g = pixData[start + 1];
    var b = pixData[start + 2];
    var a = pixData[start + 3];

    return [r, g, b, a];
}

function isBlack(x, y) {
    var start = y * width * 4 + x * 4;
    var r = pixData[start];

    if(r === 0) {
        return true;
    } else {
        return false;
    }
}