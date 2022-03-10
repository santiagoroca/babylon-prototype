import { Mesh, MeshBuilder } from "@babylonjs/core";
import * as UUID from 'uuid';

export default function (options: any): Mesh {
    return MeshBuilder.CreateBox(UUID.v4(), options);
}
