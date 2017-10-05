console.log("Hello, Sky!");

/**** ☭☭☭☭☭☭☭☭☭☭☭☭ ******
/☭☭☭☭ Parametri razni ☭☭☭☭ *
******☭☭☭☭☭☭☭☭☭☭☭☭******/

// Odmik kamere
var odmik_kamere = 100;

// Rotacija kamere
var cam_rot_offset = 0.2;

// Vidni kot
var FOV = 140;

// Sirina in visina objektov
var width = 2;
var height = 2;

// Prvotno prazno polje objektov. Lahko bi kak buffer to bil pozneje
var objekti = [];




// Parametri animacije
var rotacijaX = 0.006;
var rotacijaY = 0.001;
var rotacijaZ = 0.003;

var zamikBarve = 0.0666;

var wDiff = 0.5;
var hDiff = 0.5;





// Scena, kamera in render
scene = new THREE.Scene;

camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = odmik_kamere;

renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Belo ozadje
//renderer.setClearColor(0xFFFFFF, 1);
// Črno ozadje
renderer.setClearColor(0x000000, 1);




// Funkcija za rotacijo objektov
function objRotate() {
    objekti.map(function (obj) {
        obj.rotation.y += rotacijaY;
        obj.rotation.z += rotacijaZ;
        obj.rotation.x += rotacijaX;
        obj.material.color.offsetHSL(zamikBarve, 0, 0);
    });
};

// Funkcija za dodajanje novih objektov
function addObj(w, h) {
    var col = new THREE.Color();
    col.setHSL(h / 100 % 1, 1, 0.4);

    var mat = new THREE.LineBasicMaterial({
        color: col
    });

    var geo = new THREE.Geometry();

    var offset = h / 2;

    geo.vertices.push(new THREE.Vector3(-offset, 0, 0), new THREE.Vector3(0, offset, 0));
    geo.vertices.push(new THREE.Vector3(-offset, 0, 0), new THREE.Vector3(0, -offset, 0));
    geo.vertices.push(new THREE.Vector3(offset, 0, 0), new THREE.Vector3(0, offset, 0));
    geo.vertices.push(new THREE.Vector3(offset, 0, 0), new THREE.Vector3(0, -offset, 0));

    var obj = new THREE.Line(geo, mat, THREE.LineSegments);

    objekti.push(obj);
    scene.add(obj);
};


function render () {
    requestAnimationFrame(render);

    // Dodaj objekt vcasih
    if (height % 2 === 0) {
        addObj(width, height);
    }

    renderer.render(scene, camera);

    width += wDiff;
    height += hDiff;

    camRotate();
    objRotate();
};

function camRotate () {
    // rotiraj po z osi
    camera.translateX(cam_rot_offset);
    camera.translateZ(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));

    /*
    camera.translateY(cam_rot_offset);
    camera.translateX(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));

    camera.translateY(cam_rot_offset);
    camera.translateX(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));
    */

    camera.lookAt(new THREE.Vector3(0, 0, 0));
};

// Inicializiraj
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        document.getElementById("anim-container").appendChild(renderer.domElement);

        render();
    }
};

// Lep risajz
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
