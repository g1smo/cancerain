// Interaktivnost
var socket = io();

inputi = {
    "fov": {
        val: 120,
        min: 30,
        max: 179
    },
    "sirina": {
        val: 2,
        min: 1,
        max: 6,
        step: 0.1
    },
    "visina": {
        val: 2,
        min: 1,
        max: 6,
        step: 0.1
    },
    "obj_limit": {
        val: 1000,
        min: 1,
        max: 10000
    },
    "rotx": {
        val: 0,
        min: -0.1,
        max: 0.1,
        step: 0.001
    },
    "roty": {
        val: 0,
        min: -0.1,
        max: 0.1,
        step: 0.001
    },
    "rotz": {
        val: 0,
        min: -0.1,
        max: 0.1,
        step: 0.001
    },
    "barva_mod": {
        val: 0.001,
        min: 0.001,
        max: 0.18,
        step: 0.001
    },
    "cam_rot_offset": {
        val: 0,
        min: -10,
        max: 10,
        step: 0.1
    }
};

Object.keys(inputi).map(function (name) {
    var valEl = document.getElementById(name + "Val");
    if (!valEl) { return; }

    var ctlEl = document.getElementById(name + "Ctl");
    var params = inputi[name];

    var step = params.step;
    if (!step) step = 1;
    noUiSlider.create(ctlEl, {
        start: [params.val],
        range: {
            min: [params.min],
            max: [params.max]
        },
        step: step
    });

    ctlEl.noUiSlider.on('slide', _.throttle(function(val) {
        console.log("update!");
        var value = val[0];
        valEl.innerHTML = value;
        socket.emit('adjust', name, value);
    }, 125, { trailing: true}));

    valEl.innerHTML = ctlEl.noUiSlider.get();
});


callbacks = {
    fov: function(val) {
        if (typeof camera === 'undefined') return;
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
    default: function(name, val) {
        window[name] = parseFloat(val);
    }
};

socket.on('adjust', function(name, val, id) {
    if (id === socket.id) {
        return;
    }

    if (name in callbacks) {
        callbacks[name].call(this, val);
    } else {
        callbacks["default"].call(this, name, val);
    }

    var valEl = document.getElementById(name + "Val");
    if (!valEl) { return; }
    var ctlEl = document.getElementById(name + "Ctl");

    ctlEl.noUiSlider.set(val, false);
    valEl.innerHTML = ctlEl.noUiSlider.get();
});
