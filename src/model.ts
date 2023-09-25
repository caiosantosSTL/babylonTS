import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from '@babylonjs/core'

class App{
    private _scene: BABYLON.Scene;
    private _engine: BABYLON.Engine;
    private _camera: BABYLON.ArcRotateCamera;

    constructor(){
        var canvas = document.createElement("canvas")
        canvas.id = "canvas"
        const containerDiv = document.querySelector(".container")
        containerDiv.appendChild(canvas)


        // initialize babylon scene and _this._engine
        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = new BABYLON.Scene(this._engine);

        this._camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this._scene);
        this._camera.inputs.addMouseWheel()
        this._camera.lowerRadiusLimit = 15; 
        this._camera.upperRadiusLimit = 50;
        this._camera.attachControl(canvas, true);

        this.skyDome();

        this.meshModel()

        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this._scene);
        //var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this._scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    public async skyDome(){
        const dome: BABYLON.PhotoDome = await new BABYLON.PhotoDome(
            "testdome",
            "/texture/sky/cerulux1.png", {resolution: 32, size: 1000},
            this._scene
        )
    }

    public async meshModel(){
        await BABYLON.SceneLoader.ImportMesh("", "/models/", "montmap.glb", this._scene, function (meshes) {
            this._camera.target = meshes[0]
            console.log("mesh: ", meshes)
          });
    }


}

new App();