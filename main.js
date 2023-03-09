import './style.css';

import * as THREE from "https://unpkg.com/three@0.150.1/build/three.module.js";//'three';
//import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { PlaneGeometry, SphereGeometry, TorusGeometry , Clock, Fog, VSMShadowMap, Loader,} from 'three';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

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

//const suntexture = textureLoader.load('./sunTexture.png');
// Objects




const basic = new THREE.MeshBasicMaterial({color:0x300350 })

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
});

const cirlceGeo = new THREE.CircleGeometry( 3, 32 );


const materialStandard2= new THREE.MeshBasicMaterial( {
map: textureLoader.load('./sunTexture.jpg') } );//0xF9AC53 


const circle = new THREE.Mesh( cirlceGeo, materialStandard2 );
circle.position.x += 0.1; //left and right position of the

scene.add(circle);


const meteorGeo = new THREE.IcosahedronGeometry(0.1);
const meteor = new THREE.Mesh(meteorGeo,material2);
meteor.position.z = 2.3;
meteor.position.y = 0.4;
meteor.position.x = -0.2

scene.add(meteor); 

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
camera.position.z = 2.3//2.15//1.1;


//LIGHT
const ambientLight = new THREE.AmbientLight("#ffffff", 10);
scene.add(ambientLight);

//CONTROLS (Eventually)
//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;


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
  //camera.position.z += 0.01

  
  const top = Math.abs( document.body.getBoundingClientRect().top);
  
  const bottom = document.getElementById("space").scrollHeight / 1.17; //this is about 1.17 * maximum height we can scroll to
  
  //console.log("top is " +top +" bottom is " + bottom + " and camera position is " + camera.position.z);
  camera.position.z =2.3 +  top * 0.0001;
  //console.log(camera.position.x, camera.position.y,camera.position.z);
  
}

const tick = () => {
   const elapsedTime = clock.getElapsedTime();

  // Update controls
  //controls.update();
  document.onscroll = moveCamera
   
    meteor.rotation.z += 0.01;
    meteor.rotation.x += 0.01;
    meteor.rotation.y += 0.01;

  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
  
};


// Calling tick will initiate the rendering of the scene
tick(); //don't actually think we need to animate it with frames lol

