import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from '@babylonjs/core'

class App{
    constructor(){
        var canvas = document.createElement("canvas")
        canvas.id = "canvas"
        const containerDiv = document.querySelector(".container")
        containerDiv.appendChild(canvas)


        // initialize babylon scene and engine
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);

        var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }


}

new App();