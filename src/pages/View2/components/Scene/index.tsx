import { useLayoutEffect } from 'react';
import { createStyles } from 'antd-style';
import * as THREE from 'three';

const useStyles = createStyles(({ css }) => ({
  text: css`
    position: absolute;
    z-index: 100;
    width: 100%;
    display: block;
  `,
}));

function init() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(600, 900);

  const canvas = document.querySelector('#canvas');
  canvas?.appendChild(renderer.domElement);

  const material = new THREE.LineBasicMaterial({ color: 0x727fff });

  const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  scene.add(line);
  renderer.render(scene, camera);

  return () => {
    canvas?.removeChild(renderer.domElement);
  };
}

const Scene = () => {
  const { styles } = useStyles();
  useLayoutEffect(() => {
    const dispose = init();
    return dispose;
  }, []);
  return (
    <div id="canvas">
      <div className={styles.text}>Description</div>
    </div>
  );
};

export default Scene;
