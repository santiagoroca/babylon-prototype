import Mesh from '../Render/Mesh';
import Scene from '../Render/Scene';
import GridMaterial from '../Render/Material/GridMaterial';

class GridGround {
    static frequency = 1;

    private mesh: Mesh;

    constructor (scene: Scene) {
        this.mesh = Mesh.CreateGround('ground1', 100, 100, 2, scene, false);
        this.mesh.material = new GridMaterial("groundMaterial", scene);
        (this.mesh.material as GridMaterial).opacity = 0.3;
        (this.mesh.material as GridMaterial).majorUnitFrequency = GridGround.frequency;

        /**
         * Note to the interviewer:
         * 
         * THis is hacky. This avoids this grid from
         * getting in the way of interacting with the
         * container handler. 
         * 
         * Ideally we should ignore interactions with teh
         * grid rather than moving it down.
         * 
         * This still won't allow interacting with the
         * control from below. 
         * 
         * We can restrict camera rotation to also avoid
         * that. Hacky again... :/
         */
        this.mesh.position.set(1, -0.1, 1);
    }

}

export default GridGround;