import './style.css';

import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { PlaneGeometry, SphereGeometry, TorusGeometry } from 'three';


const scene = new THREE.Scene();

const canvas = document.querySelector('#bg');
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//TEXTTURES

const textureLoader = new THREE.TextureLoader();
// Load a texture from a given path using the texture loader
const gridTexture = textureLoader.load('./grid.png');


// Objects
//const geometry = new THREE.PlaneGeometry(1, 2,24,24);
//const geometry = new TorusGeometry(10,3,16,100);
const geometry = new PlaneGeometry(1,2);
const material = new THREE.MeshStandardMaterial({
  color:  0xFF6347,
  map: gridTexture
});


const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.0;
plane.position.z = 0.15;

scene.add(plane);

//CAMERA
const camera = new THREE.PerspectiveCamera(

   75,//field of view
   sizes.width / sizes.height, //aspect ratio
   0.01, //these last two are near plane and far plane
   20
);

camera.position.x = 0;
camera.position.y = 0.06;
camera.position.z = 1.1;


//LIGHT
const ambientLight = new THREE.AmbientLight("#ffffff", 10);
scene.add(ambientLight);


//CONTROLS (Eventually)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGL1Renderer({
  canvas:canvas,
  
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Event listener to handle screen resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera's aspect ratio and projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  // Note: We set the pixel ratio of the renderer to at most 2
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
  // Update controls
  controls.update();
   
  //geometry.rotateZ(0.01);

  // Update the rendered scene
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  
};

// Calling tick will initiate the rendering of the scene
tick();