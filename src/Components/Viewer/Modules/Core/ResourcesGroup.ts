import * as UUID from 'uuid';
import ContainerController from './ContainerController';
import Resource from './Resource';
import Container from './Container';
import ResourcesGrid from './ResourcesGrid';
import Scene from '../Render/Scene';
import Camera from '../Render/Camera';
import Engine from '../Render/Engine';

class ResourcesGroup {

    private container : Container;
    private resourcesGrid: ResourcesGrid;
    private containerController: ContainerController;

    private width : number = 0;
    private height: number = 0;

    constructor (scene: Scene) {
        this.container = new Container();
        this.resourcesGrid = new ResourcesGrid();
        this.containerController = new ContainerController(scene);

        for (let i = 0; i < 50; i++) {
            this.resourcesGrid.push(new Resource(scene, i.toString()));
        }
    }

    update (scene: Scene, camera: Camera, engine: Engine) {
        const width = Math.max(0, this.containerController.position.x) * 2;
        const height = Math.max(0, this.containerController.position.z) * 2;
        this.resourcesGrid.update(scene, camera, engine, width, height);

        if (width === this.width && height === this.height) {
            return;
        }

        this.container.update(width, height);
    
        this.width = width;
        this.height = height;
    }

}

export default ResourcesGroup;