import { Color, LineBasicMaterial } from "../node_modules/three/src/Three.Core.js";
import * as THREE from "../node_modules/three/build/three.module.js";

// canvas 
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene();

// OBEJECTS____________________________________________________________________________________

//ORANGES
const orangeMap = new THREE.TextureLoader().load("./images/orange.png");
const orangeSpriteMaterial = new THREE.SpriteMaterial({
    map: orangeMap,
    color: 0xe6aa0a
});
const orangePositions = [ 
    [1, 2.3, 0],
    [2, 5, 4], 
    [3, 4, 1], 
    [4,7, 3], 
    [5,5.5, 4]
];
function locateOrangeSprite(position){
    const orangeSprite = new THREE.Sprite(orangeSpriteMaterial);
    orangeSprite.position.set(position[0],
        position[1],
        position[2],
        position[3],
        position[4],);
    scene.add(orangeSprite);
}
orangePositions.forEach(locateOrangeSprite);

//APPLES
const appleMap = new THREE.TextureLoader().load("./images/apple.png");
const appleSpriteMaterial = new THREE.SpriteMaterial({
    map: appleMap,
    color: 0xe6aa0a
});
const applePositions = [ 
    [7, 5, 0],
    [3, 1.7, 4], 
    [2, 1.2, 1], 
    [6,2, 3], 
    [6.5,4, 4]
];
function locateAppleSprite(position){
    const appleSprite = new THREE.Sprite(appleSpriteMaterial);
    appleSprite.position.set(position[0],
        position[1],
        position[2],
        position[3],
        position[4],);
    scene.add(appleSprite);
}
applePositions.forEach(locateAppleSprite);

//AXIS
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// camera____________________________________________________________________________________________________________
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