import * as UUID from 'uuid';
import ContainerController from '../Geometry/ContainerController';
import Mesh from '../Render/Mesh';
import Resource from './Resource';
import Container from './Container';
import ResourcesGrid from './ResourcesGrid';
import Scene from '../Render/Scene';
import Camera from '../Render/Camera';
import Engine from '../Render/Engine';

class ResourcesGroup {

    private container : Container;
    private resourcesGrid: ResourcesGrid;
    private controllerMesh: Mesh;

    private width : number = 0;
    private height: number = 0;
    private dragging: boolean = false;

    constructor () {
        this.container = new Container();
        this.resourcesGrid = new ResourcesGrid();

        this.controllerMesh = ContainerController(
            {
                diameter: 0.5,
                segments: 16
            }, 
            this.onControllerStart.bind(this),
            this.onControllerEnd.bind(this),
        );

        for (let i = 0; i < 10; i++) {
            this.resourcesGrid.push(new Resource(i.toString()));
        }
    }

    onControllerStart () {
        this.dragging = true;
    }

    onControllerEnd () {
        this.dragging = false;
    }

    update (scene: Scene, camera: Camera, engine: Engine) {
        const width = Math.max(0, this.controllerMesh.position.x) * 2;
        const height = Math.max(0, this.controllerMesh.position.z) * 2;

        this.resourcesGrid.update(scene, camera, engine, width, height);

        if (!this.dragging) {
            return;
        }

        if (width === this.width && height === this.height) {
            return;
        }

        this.container.update(width, height);
    
        this.width = width;
        this.height = height;
    }

}

export default ResourcesGroup;