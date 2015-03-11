
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var tri_vertices = new Float32Array([0, 0, 0, 0.75, 0.75, 0.75])
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tri_vertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    // Associate our shader variables with our data buffer
    index=0;
    canvas.addEventListener("click", function(){index=index+1; if (index==4){index=1;}});
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    if (index == 1){
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    else if (index == 2){
        gl.drawArrays(gl.LINE_LOOP, 0, 0, 0.5, 1, 1, 0);
    }
    else{
        gl.drawArrays(gl.LINE_LOOP, 0, 0, 0, 0.5, 0.5, 1, 1, 0.5, 1, 0)
    }
}
