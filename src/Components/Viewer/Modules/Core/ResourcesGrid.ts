import Resource from './Resource';
import Scene from '../Render/Scene';
import Camera from '../Render/Camera';
import Engine from '../Render/Engine';

class ResourcesGrid extends Array<Resource> {
    static gap = 0.1;

    update (scene: Scene, camera: Camera, engine: Engine, width: number, height: number) {
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const rowCount = Math.trunc(width / (Resource.size + ResourcesGrid.gap));
        const rowWidth = width / rowCount;

        let xPosition = ResourcesGrid.gap + Resource.size / 2;
        let yPosition = ResourcesGrid.gap + Resource.size / 2;

        for (const resource of this) {
            resource.visible = false;
        }

        if (Resource.size + ResourcesGrid.gap > width) {
            return;
        }

        for (const resource of this) {
            if (xPosition >= width) {
                xPosition = ResourcesGrid.gap + Resource.size / 2;
                yPosition += Resource.size + ResourcesGrid.gap;

                if (yPosition >= height) {
                    break;
                }
            }

            resource.update(scene, camera, engine, xPosition - halfWidth, yPosition - halfHeight);
            resource.visible = true;

            xPosition += rowWidth;
        }
    }

}

export default ResourcesGrid;