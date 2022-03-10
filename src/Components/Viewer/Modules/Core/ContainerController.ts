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
import GridGround from './GridGround';

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

        /**
         * Note to the interviewer:
         * 
         * This will result in a buggy experience. Rather
         * we should clamp x and z values to 0 if they 
         * go below it. 
         * 
         * For simplicity, this should do it.
         */
        pointerDragBehavior.validateDrag = (position: Vector3): boolean => {
            if (position.x < 0 || position.z < 0) {
                return false;
            }
            
            return true;
        }

        pointerDragBehavior.attach(this.mesh);
        pointerDragBehavior.onDragStartObservable.add(this.onControllerStart.bind(this));
        pointerDragBehavior.onDragEndObservable.add(this.onControllerEnd.bind(this));
        pointerDragBehavior.onDragObservable.add(this.onControllerDrag.bind(this));
    }

    onControllerStart () {
        this.dragging = true;
        this.mesh.scaling.set(1.1, 1.1, 1.1);
    }

    onControllerEnd () {
        this.dragging = false;
        this.mesh.scaling.set(1, 1, 1);

        console.log(2 * Math.floor(this.mesh.position.x / GridGround.frequency));

        this.mesh.position.set(
            Math.round(this.mesh.position.x / GridGround.frequency),
            0,
            Math.round(this.mesh.position.z / GridGround.frequency),
        );
    }

    onControllerDrag () {
        this.mesh.position.set(
            Math.max(this.mesh.position.x, 0),
            Math.max(this.mesh.position.y, 0),
            Math.max(this.mesh.position.z, 0),
        )
    }

    get position (): Vector3 {
        return this.mesh.position;
    }

}

export default ContainerController;
