function create_canvas() {

    width = document.getElementById("canvas").parentElement.offsetWidth + "px";
    height = document.getElementById("canvas").parentElement.offsetHeight + "px";
    document.getElementById("canvas").setAttribute("width", width);
    document.getElementById("canvas").setAttribute("height", height);
    var canvas = new fabric.Canvas('canvas');
    return canvas;
}

function create_rect(canvas) {

    return new fabric.Rect({
        left: Math.round(canvas.width / 2),
        top: Math.round(canvas.height / 2),
        fill: 'red',
        width: Math.round(canvas.width * 0.1),
        height: canvas.height,
        lockMovementY: true,
        lockRotation: true,
        lockScalingFlip: true,
        lockScalingY: true,
        centeredScaling: true,
        lockScalingFlip: true,
        minScaleLimit: 0.01,
        originX: "center",
        originY: "center",
    });
}

function constrain_object_move(canvas) {
    // limit object moving to inside the canvas
    canvas.on('object:moving', function (e) {
        var obj = e.target;
        // if object is too big ignore
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj
            .getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj
                .getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj
                .getBoundingRect().left);
        }
    });
}