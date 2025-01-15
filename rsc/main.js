import { Color, LineBasicMaterial } from "../node_modules/three/src/Three.Core.js";
import * as THREE from "../node_modules/three/build/three.module.js";

// canvas 
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene();

// Objects

//ORANGES
const orangeMap = new THREE.TextureLoader().load("./images/orange.png");
const orangeSpriteMaterial = new THREE.SpriteMaterial({
    map: orangeMap,
    color: 0xe6aa0a
});

const positions = [ 
    [1, 1, 0], 
    [2, 5, 4], 
    [3, 3, 1], 
    [4,7, 3], 
    [5,5, 4]
];

function locateSprite(position){
    const orangeSprite = new THREE.Sprite(orangeSpriteMaterial);
    orangeSprite.position.set(position[0],
        position[1],
        position[2],
        position[3],
        position[4],);
    scene.add(orangeSprite);
}
positions.forEach(locateSprite);

//AXIS
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// camera
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 15;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);

// Render loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();