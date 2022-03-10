import ContainerGeometry from '../Geometry/Container';
import Mesh from '../Render/Mesh';

class Container {

    private mesh : Mesh | undefined = undefined;

    update (width: number, height: number) {
        if (this.mesh) {
            this.mesh.dispose();
        }

        this.mesh = ContainerGeometry({
            width, 
            height, 
            wall_height: 0.1,
            wall_thickness: 0.01
        });
    }

}

export default Container;