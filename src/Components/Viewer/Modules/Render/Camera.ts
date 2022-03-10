import { ArcRotateCamera } from "@babylonjs/core";
import Scene from './Scene';
import Vector3 from '../Math/Vector3';

class LocalCamera extends ArcRotateCamera {

    constructor (canvas: HTMLCanvasElement, scene: Scene) {
        super("Camera", 0, 0, 10, new Vector3(0, 0, -10), scene);
        this.setTarget(Vector3.Zero());
        this.attachControl(canvas, true);
        this.upperBetaLimit = Math.PI / 2;
        this.lowerBetaLimit = Math.PI / 4;
    }

}

export default LocalCamera;