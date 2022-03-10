import { Engine } from "@babylonjs/core";

class LocalEngine extends Engine {

    constructor (canvas: HTMLCanvasElement) {
        super(canvas, true, { preserveDrawingBuffer: true });
    }

}

export default LocalEngine;