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
    [2, 1, 1], 
    [6,2, 3], 
    [6.5,4, 4]
];
function locateAppleSprite(position){
    const appleSprite = new THREE.Sprite(appleSpriteMaterial);
    appleSprite.position.set(
        position[0],
        position[1],
        position[2],
        position[3],
        position[4],);
    scene.add(appleSprite);
}
applePositions.forEach(locateAppleSprite);

//AXIS
const xMaterial = new THREE.LineBasicMaterial(
    {
        color: 0xff0000,
        linewidth: 3
    }
)
const yMaterial = new THREE.LineBasicMaterial(
    {
        color: 0x196f3d,
        linewidth: 3
    }
)
const zMaterial = new THREE.LineBasicMaterial(
    {
        color: 0x0000ff,
        linewidth: 3
    }
)

//x axis
const xGeometry = new THREE.BufferGeometry().setFromPoints(
    [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(10,0,0)
    ]
)
const xAxis = new THREE.Line(xGeometry, xMaterial)

//y axis
const yGeometry = new THREE.BufferGeometry().setFromPoints(
    [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,10,0)
    ]
)
const yAxis = new THREE.Line(yGeometry, yMaterial)

//z axis
const zGeometry = new THREE.BufferGeometry().setFromPoints(
    [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,10)
    ]
)
const zAxis = new THREE.Line(zGeometry, zMaterial)

const axesGroup = new THREE.Group();
axesGroup.add(xAxis)
axesGroup.add(yAxis)
axesGroup.add(zAxis)
scene.add(axesGroup)

//DECISION PLANE

//THIN LINE
const planeGeometry = new THREE.BoxGeometry(12, 12, 0.05); 
const planeMaterial = new THREE.MeshBasicMaterial(
    { color: 0xff0000, 
        side: THREE.DoubleSide, 
        opacity: 1, 
        transparent: true }); 
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

//THICCCCC LINE
const thickGeometry = new THREE.BoxGeometry(10, 10, 0.55); 
const thickMaterial = new THREE.MeshBasicMaterial(
    { color: 0xff0000, 
        side: THREE.DoubleSide, 
        opacity: 0.2, 
        transparent: true }); 
const thickPlane = new THREE.Mesh(thickGeometry, thickMaterial);
const desicionPlaneGroup = new THREE.Group();

desicionPlaneGroup.add(plane);
desicionPlaneGroup.add(thickPlane)
desicionPlaneGroup.translateX(5);
desicionPlaneGroup.translateY(4.4);
desicionPlaneGroup.rotateY(1.5708);
desicionPlaneGroup.rotateX(0.893);
scene.add(desicionPlaneGroup);
// camera____________________________________________________________________________________________________________
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.OrthographicCamera(-10,10,10,-10,0.1,1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
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