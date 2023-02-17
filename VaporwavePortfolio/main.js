import './style.css';

import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { PlaneGeometry, SphereGeometry, TorusGeometry , Clock, Fog} from 'three';


const scene = new THREE.Scene();
const clock = new THREE.Clock();

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
const terrainTexture = textureLoader.load('./displacementmapSmall.png')

// Objects
//const geometry = new THREE.PlaneGeometry(1, 2,24,24);
//const geometry = new TorusGeometry(10,3,16,100);
const geometry = new PlaneGeometry(1,2,24,24);
const material = new THREE.MeshStandardMaterial({
  color:  0x94167F,
  map: gridTexture,
  // Add the displacement map / height map to the material
  displacementMap: terrainTexture,
  // Tweak the displacement scale to adjust the "intensity" of the terrain
  displacementScale: 0.4,
});

const material2 = new THREE.MeshStandardMaterial({
  color:  0xF153CB4,//0xE93479,
  map: gridTexture,
  // Add the displacement map / height map to the material
  displacementMap: terrainTexture,
  // Tweak the displacement scale to adjust the "intensity" of the terrain
  displacementScale: 0.4,
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.0;
plane.position.z = 3.0//0.15;

const plane2 = new THREE.Mesh(geometry, material);
plane2.rotation.x = -Math.PI * 0.5;
plane2.position.y = 0.0;
plane2.position.z = 5;//1.85; // 0.15 - 2 (the length of the first plane) WHY IS THIS NUMBER IRRELEVANT?


scene.add(plane);
scene.add(plane2);





//CAMERA
const camera = new THREE.PerspectiveCamera(

   75,//field of view
   sizes.width / sizes.height, //aspect ratio
   0.01, //these last two are near plane and far plane
   20
);

camera.position.x = 0;
camera.position.y = 0.1//0.06;
camera.position.z = 2.15//1.1;


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

const moveCamera = () => {
  camera.position.z += 0.01
}

const tick = () => {
   const elapsedTime = clock.getElapsedTime();

  // Update controls
  //controls.update();
  document.onscroll = moveCamera
   
  //geometry.rotateZ(0.01);
  //plane.position.z = -1 * (elapsedTime * 0.15) % 2;
  //plane2.position.z = -1 * (((elapsedTime * 0.15) % 2) - 1.85);
  //plane2.position.z = 1.85
  // Update the rendered scene
  //plane.position.z = 3 - (elapsedTime * 0.15) % 2;
  //plane2.position.z = 4 - (elapsedTime * 0.15) % 2;
  //maybe an if statement to manually move plane1 behind plane2?

  //plane.position.z = (((elapsedTime * 0.15) % 2 )+ 3);
  //if (plane.position.z > 0) {plane.position.z -= 0.01}
  

  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  
};


// Calling tick will initiate the rendering of the scene
tick(); //don't actually think we need to animate it with frames lol

