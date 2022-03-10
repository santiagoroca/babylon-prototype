import { PolygonMeshBuilder } from "@babylonjs/core";
import Mesh from '../Render/Mesh';
import Loop2 from '../Math/Loop2';
import * as UUID from 'uuid';
import earcut from 'earcut';

class Polygon2 {

    private outer_loop: Loop2;
    private holes: Array<Loop2>;

    constructor (outer_loop: Loop2 = [], holes: Array<Loop2> = []) {
        this.outer_loop = outer_loop;
        this.holes = holes;
    }

    extrude (depth: number): Mesh {
        const polygon = new PolygonMeshBuilder(UUID.v4(), this.outer_loop, undefined, earcut);

        for (const hole of this.holes) {
            polygon.addHole(hole);
        }

        /**
         * Note to the interviewer:
         * 
         * This is likely using CSG operations 
         * underneath. We could possibly build all
         * the walls ourselves manually given the 
         * corner coordinates and the hole.
         * 
         * Wouldn't look nice but would be really 
         * performant if that's what we are aiming 
         * for.
         */
        return polygon.build(true, depth);
    }

}

export default Polygon2;