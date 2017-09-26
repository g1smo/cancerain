console.log("Hello, Sky!");

function lineRotate() {
    _results = [];

    for (i = _i = 0, _ref = this.lines.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.lines[i].rotation.y += 0.001;
        this.lines[i].rotation.z += 0.003;
        this.lines[i].rotation.x += 0.006;
        _results.push(this.lines[i].material.color.offsetHSL(0.0666, 0, 0));
    }
    return _results;
};

scene = new THREE.Scene;

camera = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

renderer = new THREE.WebGLRenderer({
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFFFFFF, 1);
pixel_size = 2;
width = 2;
height = 2;
width -= this.width % this.pixel_size;
height -= this.height % this.pixel_size;
lines = [];

function addLineGrid(pixel_size, width, height) {
    var col = new THREE.Color();
    col.setHSL(this.height / 100 % 1, 1, 0.4);

    var mat = new THREE.LineBasicMaterial({
        color: col
    });

    var geo = new THREE.Geometry();

    var offset = height / 2;

    geo.vertices.push(new THREE.Vector3(-offset, 0, 0), new THREE.Vector3(0, offset, 0));
    geo.vertices.push(new THREE.Vector3(-offset, 0, 0), new THREE.Vector3(0, -offset, 0));
    geo.vertices.push(new THREE.Vector3(offset, 0, 0), new THREE.Vector3(0, offset, 0));
    geo.vertices.push(new THREE.Vector3(offset, 0, 0), new THREE.Vector3(0, -offset, 0));

    var line = new THREE.Line(geo, mat, THREE.LineSegments);

    this.lines.push(line);
    this.scene.add(line);

    grid = line;
};


function render () {
    requestAnimationFrame(render);

    if (height % 2 === 0) {
        addLineGrid(pixel_size, width, height);
    }

    renderer.render(scene, camera);
    width += 0.5;
    height += 0.5;
    camRotate();
    lineRotate();
};

function camRotate () {
    var dist = 100;
    var offset = 1;
    camera.translateX(offset);
    camera.translateZ(dist - Math.sqrt(Math.pow(dist, 2) + Math.pow(offset, 2)));
    camera.lookAt(new THREE.Vector3(0, 0, 0));
};

// Inicializiraj
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        document.getElementById("anim-container").appendChild(renderer.domElement);

        render();
    }
}
