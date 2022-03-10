import Mesh from '../Render/Mesh';
import Box from '../Geometry/Box';
import Matrix from '../Math/Matrix';
import Vector3 from '../Math/Vector3';
import Scene from '../Render/Scene';
import Camera from '../Render/Camera';
import Engine from '../Render/Engine';
import ActionManager from '../Event/ActionManager';
import ExecuteCodeAction from '../Event/ExecuteCodeAction';
import Color3 from '../Render/Color3';
import Color4 from '../Render/Color4';
import StandardMaterial from '../Render/Material/StandardMaterial';


class Resource {
    static size: number = 0.5;

    private mesh: Mesh;
    private label : HTMLDivElement;

    constructor (scene: Scene, label: string) {
        this.mesh = Box({ size: Resource.size });
        this.mesh.enableEdgesRendering(); 
        this.mesh.edgesWidth = 2.0;
        this.mesh.edgesColor = new Color4(1, 0, 1, 1);
        this.mesh.material = new StandardMaterial("", scene);
        (this.mesh.material as StandardMaterial).emissiveColor = Color3.Blue();
        this.mesh.actionManager = new ActionManager(scene);
        	
        //ON MOUSE ENTER
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () =>{	
            if (this.mesh && this.mesh.material) {
                this.label.style.visibility = 'visible'; 
                (this.mesh.material as StandardMaterial).emissiveColor = Color3.Red();
                this.mesh.scaling.set(1.1, 1.1, 1.1);
            }
        }));
        
        //ON MOUSE EXIT
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () =>{
            if (this.mesh && this.mesh.material) {
                this.label.style.visibility = 'hidden'; 
                (this.mesh.material as StandardMaterial).emissiveColor = Color3.Blue();
                this.mesh.scaling.set(1, 1, 1);
            }
        }));

        /**
         * Note to the interviewer:
         * 
         * If there were a better designed API, 
         * this viewer would accept "DOM Elements"
         * and IDs so that those elements would get
         * attached to the element identified by such
         * id.
         * 
         * The icon would follow, on the projected
         * coordinates of the screen, the position
         * of the element in the world space.
         */
        this.label = document.createElement('div');
        this.label.innerHTML = label;
        this.label.style.position = 'absolute';
        this.label.style.background = 'white';
        this.label.style.padding = '5px';
        this.label.style.borderRadius = '2px';
        this.label.style.pointerEvents = 'none';
        this.label.style.visibility = 'hidden';
        document.body.appendChild(this.label)

        this.visible = false;
    }

    update (scene: Scene, camera: Camera, engine: Engine, xPosition: number, yPosition: number) {
        this.mesh.position.set(xPosition, 0, yPosition);

        const coordinates = Vector3.Project(
            new Vector3(xPosition, 0, yPosition),
            Matrix.Identity(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(
            engine.getRenderWidth(),
            engine.getRenderHeight(),
        ));

        this.label.style.left = `${coordinates.x}px`;
        this.label.style.top = `${coordinates.y}px`;
    }

    set visible (visible: boolean) {
        this.mesh.setEnabled(visible);
    }

}

export default Resource;