import { useEffect, useRef } from "react";
import styled from 'styled-components';

import Engine from './Modules/Render/Engine';
import Scene from './Modules/Render/Scene';
import Camera from './Modules/Render/Camera';
import Environment from './Modules/Render/Environment';
import ResourcesGroup from './Modules/Core/ResourcesGroup';

const GreddyCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default () => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) {
      return;
    }

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    const camera = new Camera(canvas, scene);
    const environment = new Environment(scene);
    const resourceGroup = new ResourcesGroup();

    const resize = () => {
      scene.getEngine().resize();
    };

    window.addEventListener("resize", resize);

    engine.runRenderLoop(() => {
      resourceGroup.update(scene, camera, engine);
      scene.render();
    });

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  });

  return <GreddyCanvas ref={reactCanvas} />;
};