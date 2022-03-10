import { MeshBuilder, PointerDragBehavior } from "@babylonjs/core";
import Mesh from '../Render/Mesh';

export default function (options: any): Mesh {
    return MeshBuilder.CreatePlane("plane", options);
}
