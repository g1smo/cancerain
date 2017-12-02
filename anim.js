console.log("Hello, Sky!");

/**** ☭☭☭☭☭☭☭☭☭☭☭☭ ******
/☭☭☭☭ Parametri razni ☭☭☭☭ *
******☭☭☭☭☭☭☭☭☭☭☭☭******/

// Odmik kamere
var odmik_kamere = 100;

// Rotacija kamere
var cam_rot_offset = 1;

// Vidni kot
var FOV = 140;

// Sirina in visina objektov
var width = 2;
var height = 2;

// Limit stevila objektov
var obj_limit = 1000;




// Prvotno prazno polje objektov. Lahko bi kak buffer to bil pozneje
var objekti = [];

// Stevec, za razno animiranje
var stevec = 0;



// Parametri animacije
var rotacijaX = 0.006;
var rotacijaY = 0.001;
var rotacijaZ = 0.003;

// Premik obstojecih barv
var zamikBarve = 0.0000666;

// Zamik pri novem objektu
var barva_mod = 0.333;
var saturacija = 1;
var svetlost = 0.4;

var wDiff = 0.5;
var hDiff = 0.5;

var gostota_obj = 2;





// Scena, kamera in render
scene = new THREE.Scene;

camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = odmik_kamere;

renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Belo ozadje
//renderer.setClearColor(0xFFFFFF, 1);
// Črno ozadje
renderer.setClearColor(0x000000, 1);





function render () {
    requestAnimationFrame(render);

    stevec += 1;

    // Dodaj objekt vcasih
    if (stevec % gostota_obj === 0) {
        addObj(width, height);
    }

    renderer.render(scene, camera);

    objAnim();

    camRotate();
};

// Funkcija za animacijo objektov
function objAnim() {
    objekti.map(function (obj) {
        obj.rotation.y += rotacijaY;
        obj.rotation.z += rotacijaZ;
        obj.rotation.x += rotacijaX;

        obj.scale.z += wDiff;
        obj.scale.y += wDiff;
        obj.scale.x += wDiff;

        obj.material.color.offsetHSL(zamikBarve, 0, 0);
    });
};

// Funkcija za dodajanje novih objektov
function addObj(w, h) {
    var col = new THREE.Color();
    col.setHSL(stevec * barva_mod, saturacija, svetlost);

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

    scene.add(obj);

    // Pocisti za seboj
    if (objekti.push(obj) > obj_limit) {
        while (objekti.length > obj_limit) {
            scene.remove(objekti[0]);
            objekti.shift();
        }
    }
};

var xAksa = new THREE.Vector3(0, 1, 0);
function camRotate () {
    // rotiraj po z osi
    camera.translateX(cam_rot_offset);
    camera.translateZ(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));

    /*
    camera.translateY(cam_rot_offset);
    camera.translateX(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));

    camera.translateY(cam_rot_offset);
    camera.translateX(odmik_kamere - Math.sqrt(Math.pow(odmik_kamere, 2) + Math.pow(cam_rot_offset, 2)));



    camera.position.x = Math.sin((stevec % 10) / 10) * cam_rot_offset;
    camera.position.y = Math.cos((stevec % 10) / 10) * cam_rot_offset;
    */

    camera.lookAt(scene.position);
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
