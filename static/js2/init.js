
var oC2 = document.getElementById('c2d');
var ctx = oC2.getContext('2d');
var jmp;
var state=0;
var t=0;
var ctl=false;

var width = oC2.width;
var height = oC2.height;
var maxX = 18;
var maxY = 13;

var firstGrid;
var endGrid;
var success=true;
var fly=false;
var drop=false;
var visited=[];
for(var i=0;i<height;i+=10)
{
    visited[i]=[];
    for(var j=0;j<width;j+=10)
    {
        visited[i][j]=false;
    }
}
var oC3 = document.getElementById('c3d');
var webgl = oC3.getContext('webgl');

var vsScript = document.getElementById('shader-vs').innerText;
var fsScript = document.getElementById('shader-fs').innerText;

var vs = webgl.createShader(webgl.VERTEX_SHADER);
var fs = webgl.createShader(webgl.FRAGMENT_SHADER);

webgl.shaderSource(vs, vsScript);
webgl.shaderSource(fs, fsScript);

webgl.compileShader(vs);
if(!webgl.getShaderParameter(vs, webgl.COMPILE_STATUS)) {
    alert('vs error');
}
webgl.compileShader(fs);
if(!webgl.getShaderParameter(fs, webgl.COMPILE_STATUS)) {
    alert('fs error');
}

var program = webgl.createProgram();

webgl.attachShader(program, vs);
webgl.attachShader(program, fs);

webgl.linkProgram(program);
webgl.useProgram(program);

var aVertexNormal = webgl.getAttribLocation(program,'aVertexNormal');
var aVertex = webgl.getAttribLocation(program, 'aVertex');
var aColor = webgl.getAttribLocation(program, 'aColor');
var aMp = webgl.getAttribLocation(program, 'aMp');
var uPMatrix = webgl.getUniformLocation(program, 'uPMatrix');
var uMVMatrix = webgl.getUniformLocation(program, 'uMVMatrix');
var uCRMatrix = webgl.getUniformLocation(program, 'uCRMatrix');
var uCMVMatrix = webgl.getUniformLocation(program, 'uCMVMatrix');
var uTex = webgl.getUniformLocation(program, 'uTex');
var isMaze = webgl.getUniformLocation(program, 'isMaze');
var uNormalMatrix = webgl.getUniformLocation(program,'uNormalMatrix');

webgl.enableVertexAttribArray(aVertex);
webgl.enableVertexAttribArray(aMp);
webgl.enableVertexAttribArray(aVertexNormal);

var po_data = [];
var index_data = [];
var mp_data = [];
var normal_data=[];
var item, tmp;
var s = 0;
var k;
var count = 0;








