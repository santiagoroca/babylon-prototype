import Resource from './Resource';
import Scene from '../Render/Scene';
import Camera from '../Render/Camera';
import Engine from '../Render/Engine';

class ResourcesGrid extends Array<Resource> {
    static gap = 0.1;
    static padding = 0;

    update (scene: Scene, camera: Camera, engine: Engine, width: number, height: number) {
        const realWidth = width - ResourcesGrid.padding;
        const realHeight = height - ResourcesGrid.padding;
        const halfWidth = realWidth / 2;
        const halfHeight = realHeight / 2;
        const rowCount = Math.trunc(realWidth / (Resource.size + ResourcesGrid.gap*2));
        const rowWidth = realWidth / rowCount;

        let xPosition = ResourcesGrid.gap + Resource.size / 2;
        let yPosition = ResourcesGrid.gap + Resource.size / 2;

        for (const resource of this) {
            resource.visible = false;
        }

        if (Resource.size + ResourcesGrid.gap > realWidth) {
            return;
        }

        for (const resource of this) {
            if (xPosition >= realWidth) {
                xPosition = ResourcesGrid.gap + Resource.size / 2;
                yPosition += Resource.size + ResourcesGrid.gap * 2;

                if (yPosition >= realHeight) {
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