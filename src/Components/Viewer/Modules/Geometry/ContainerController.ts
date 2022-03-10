import { MeshBuilder, PointerDragBehavior } from "@babylonjs/core";
import Mesh from '../Render/Mesh';
import Vector3 from '../Math/Vector3';

export default function (
    options: any,
    start: (event: any) => void,
    end: (event: any) => void
): Mesh {
    const sphere = MeshBuilder.CreateSphere("sphere", options);
    const pointerDragBehavior = new PointerDragBehavior({
        dragPlaneNormal: new Vector3(0, 1, 0)
    });

    pointerDragBehavior.attach(sphere);
    pointerDragBehavior.onDragStartObservable.add(start);
    pointerDragBehavior.onDragEndObservable.add(end);

    return sphere;
}
