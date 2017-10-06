// Interaktivnost
var socket = io();

inputi = ["fov", "sirina", "visina", "obj_limit", "rotx", "roty", "rotz", "barva", "kamera"];

inputi.map(function (name) {
    var valEl = document.getElementById(name + "Val");
    if (!valEl) { return; }

    var ctlEl = document.getElementById(name + "Ctl");
    ctlEl.oninput = function(ev) {
        var val = ev.target.value;
        valEl.innerHTML = val;

        socket.emit('adjust', name, val);
    };

    valEl.innerHTML = ctlEl.value;
});


callbacks = {
    fov: function(val) {
        if (!camera) return;
        FOV = val;
        camera.fov = val;
        camera.updateProjectionMatrix();
    },
    sirina: function(val) {
        width = parseFloat(val);
    },
    visina: function (val) {
        height = parseFloat(val);
    },
    rotx: function(val) {
        rotacijaX = parseFloat(val);
    },
    roty: function(val) {
        rotacijaY = parseFloat(val);
    },
    rotz: function(val) {
        rotacijaZ = parseFloat(val);
    },
    obj_limit: function(val) {
        obj_limit = parseInt(val);
    },
    barva: function(val) {
        barva_mod = parseFloat(val);
    },
    kamera: function(val) {
        cam_rot_offset = parseFloat(val);
    }
};

socket.on('adjust', function(name, val) {
    callbacks[name].call(this, val);
});
