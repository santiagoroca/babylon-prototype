
import DirectionalLight from '../Render/DirectionalLight';
import Vector3 from '../Math/Vector3';
import Scene from './Scene';

class Environment {

    private mainLight: DirectionalLight;
    private fillLight: DirectionalLight;

    constructor (scene: Scene) {
        this.mainLight = new DirectionalLight("mainLight", new Vector3(0.5, 0.5, 0.5), scene);
        this.fillLight = new DirectionalLight("fillLight", new Vector3(0, 0.1, -1), scene);
    }

}

export default Environment;