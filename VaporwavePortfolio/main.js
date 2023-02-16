import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


// Objects


const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
const material = new THREE.MeshBasicMaterial({
  color:  0xffffff,
});


const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.0;
plane.position.z = 0.15;

scene.add(plane);


const camera = new THREE.PerspectiveCamera(

   75,//field of view
   sizes.width / sizes.height, //aspect ratio
   0.1, //these last two are near plane and far plane
   20
);

const renderer = new THREE.WebGL1Renderer({
  canvas:document.querySelector('#bg'),
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.setZ(30);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate()