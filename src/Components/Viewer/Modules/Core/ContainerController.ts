import Mesh from '../Render/Mesh';
import Vector3 from '../Math/Vector3';
import Vector4 from '../Math/Vector4';
import Plane from '../Geometry/Plane';
import PointerDragBehavior from '../Event/PointerDragBehavior';
import ActionManager from '../Event/ActionManager';
import ExecuteCodeAction from '../Event/ExecuteCodeAction';
import StandardMaterial from '../Render/Material/StandardMaterial';
import Texture from '../Render/Texture';
import Scene from '../Render/Scene';

class ContainerController {

    private mesh: Mesh;
    public dragging: boolean = false;

    constructor (scene: Scene) {
        const frontUVs = new Vector4(0, 0, 1, 1);
        const backUVs = new Vector4(0, 0, -1, 1);
        const material = new StandardMaterial("", scene);
        const texture = new Texture("assets/image/resize.png", scene);

        texture.hasAlpha = true;
        material.diffuseTexture = texture;

        this.mesh = Plane({ width: 0.5, height: 0.5, sideOrientation: Mesh.DOUBLESIDE, frontUVs, backUVs });
        this.mesh.rotate(new Vector3(1, 0, 0), Math.PI/2);
        this.mesh.material = material;
        this.mesh.position.set(5, 0, 5);
        this.mesh.actionManager = new ActionManager(scene);
	
        //ON MOUSE ENTER
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () =>{	
            if (this.mesh) {
                this.mesh.scaling.set(1.1, 1.1, 1.1);
            }
        }));
        
        //ON MOUSE EXIT
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () =>{
            if (this.mesh && !this.dragging) {
                this.mesh.scaling.set(1, 1, 1);
            }
        }));
        

        const pointerDragBehavior = new PointerDragBehavior({
            dragPlaneNormal: new Vector3(0, 0, 1)
        });

        pointerDragBehavior.attach(this.mesh);
        pointerDragBehavior.onDragStartObservable.add(this.onControllerStart.bind(this));
        pointerDragBehavior.onDragEndObservable.add(this.onControllerEnd.bind(this));
    }

    onControllerStart () {
        this.dragging = true;
        this.mesh.scaling.set(1.1, 1.1, 1.1);
    }

    onControllerEnd () {
        this.dragging = false;
        this.mesh.scaling.set(1, 1, 1);
    }

    get position (): Vector3 {
        return this.mesh.position;
    }

}

export default ContainerController;
