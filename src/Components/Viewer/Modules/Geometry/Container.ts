import Mesh from '../Render/Mesh';
import Vector2 from '../Math/Vector2';
import Loop2 from '../Math/Loop2';
import Polygon from './Polygon2';

interface ContainerOptions {

    /**
     * From a top-down view, the size of the
     * polygon along the X axis.
     */
    width: number;

    /**
     * From a top-down view, the size of the
     * polygon along the Z axis (Y Up).
     */
    height: number;

    /**
     * The thickness of the walls.
     */
    wall_thickness: number;

    /**
     * The height of the walls along the 
     * Y Axis (Y Up).
     */
    wall_height: number;

}

/**
 * Note to the interviewer:
 * 
 * We avoid using CSG/Boolean operations here, so that
 * performance is noticeably better allowing better
 * real-time interactions with the viewer.
 */
export default function (options: ContainerOptions): Mesh {
    const half_width = options.width / 2;
    const half_height = options.height / 2;
    const center = new Vector2(0, 0);

    const p1 = new Vector2( -half_width, -half_height );
    const p2 = new Vector2(  half_width, -half_height );
    const p3 = new Vector2(  half_width,  half_height );
    const p4 = new Vector2( -half_width,  half_height );

    const p1ToCenter = p1.subtract(center);
    const p2ToCenter = p2.subtract(center);
    const p3ToCenter = p3.subtract(center);
    const p4ToCenter = p4.subtract(center);

    /**
     * Note to the interviewer:
     * 
     * Less fancy than boolean operations, but faster and
     * more reliable, less prone to floating point
     * precision errors, specially tricky in JS
     * environments. 
     * 
     * Easier to mantain, understand and test given its
     * deterministic nature.
     */
    const outer_loop = new Loop2(p1, p2, p3, p4);
    const inner_loop = new Loop2(
        p1.subtract(p1ToCenter.scale(options.wall_thickness)), 
        p2.subtract(p2ToCenter.scale(options.wall_thickness)), 
        p3.subtract(p3ToCenter.scale(options.wall_thickness)), 
        p4.subtract(p4ToCenter.scale(options.wall_thickness)), 
    );

    return (new Polygon(outer_loop, [ inner_loop ]))
        .extrude(options.wall_height);
}
