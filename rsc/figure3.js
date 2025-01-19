// importing three
import { Color, LineBasicMaterial, Sprite} from "../node_modules/three/src/Three.Core.js"; 
import * as THREE from "../node_modules/three/build/three.module.js";

//importing gsap
import { gsap } from "../../node_modules/gsap/index.js";

// canvas 
const canvas = document.querySelector('canvas.webgl3')

// scene
const scene = new THREE.Scene();

// OBJECTS____________________________________________________________________________________

//ORANGES
const orangeMap = new THREE.TextureLoader().load("./images/orange.png");
const orangeSpriteMaterial = new THREE.SpriteMaterial({
    map: orangeMap,
    color: 0xe6aa0a
});
const orangeSprites = [];
const orangePositions = [ 
    [4.5, 5, 0],
    [2, 6, 4], 
    [3, 4.8, 1], 
    [4,7, 3], 
    [6,4.9, 4]
];
function locateOrangeSprite(position){
    const orangeSprite = new THREE.Sprite(orangeSpriteMaterial);
    orangeSprite.position.set(position[0], position[1], position[2]);
    //scene.add(orangeSprite);
    orangeSprites.push(orangeSprite);
}
orangePositions.forEach(locateOrangeSprite);

//APPLES
const appleMap = new THREE.TextureLoader().load("./images/apple.png");
const appleSpriteMaterial = new THREE.SpriteMaterial({
    map: appleMap,
    color: 0xe6aa0a
});
const appleSprites = [];
const applePositions = [ 
    [7, 3.3, 0],
    [3, 1.7, 4], 
    [2, 3.1, 1], 
    [4.5,2, 3], 
    [5,3.1, 4]
];
function locateAppleSprite(position){
    const appleSprite = new THREE.Sprite(appleSpriteMaterial);
    appleSprite.position.set(position[0], position[1], position[2]);
    //scene.add(appleSprite);
    appleSprites.push(appleSprite);
}
applePositions.forEach(locateAppleSprite);

//AXIS
const axesGroup = new THREE.Group();

const xMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 3
});
const xGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(10, 0, 0)
]);
const xAxis = new THREE.Line(xGeometry, xMaterial);

const yMaterial = new THREE.LineBasicMaterial({
    color: 0x196f3d,
    linewidth: 3
});
const yGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 10, 0)
]);
const yAxis = new THREE.Line(yGeometry, yMaterial);

const zMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    linewidth: 3
});
const zGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 10)
]);
const zAxis = new THREE.Line(zGeometry, zMaterial);

axesGroup.add(xAxis);
axesGroup.add(yAxis);
axesGroup.add(zAxis);
axesGroup.translateZ(-1.5);
//scene.add(axesGroup);

//DECISION PLANE
const decisionPlaneGroup = new THREE.Group();

const planeGeometry = new THREE.BoxGeometry(7.5, 7.5, 0.05); 
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

const thickGeometry = new THREE.BoxGeometry(6.5, 6.5, 0.7); 
const thickMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 0.2,
    transparent: true
});
const thickPlane = new THREE.Mesh(thickGeometry, thickMaterial);

decisionPlaneGroup.add(plane);
decisionPlaneGroup.add(thickPlane);
decisionPlaneGroup.translateX(4.4);
decisionPlaneGroup.translateY(4);
decisionPlaneGroup.translateZ(2);
decisionPlaneGroup.rotateY(1.5708);
decisionPlaneGroup.rotateX(1.55);

// MOVE TO CENTER
const parentGroup = new THREE.Group();

parentGroup.add(...orangeSprites);
parentGroup.add(...appleSprites);
parentGroup.add(axesGroup);
parentGroup.add(decisionPlaneGroup);

scene.add(parentGroup);

parentGroup.position.set(-6.,-5, 0);
parentGroup.scale.set(1.4,1.4);

//animation__________________________________________________________________________________________________________

document.addEventListener('DOMContentLoaded', () => {

    parentGroup.rotateX(90);
    parentGroup.translateZ(-3);
    plane.material.opacity = 0;
    thickPlane.material.opacity = 0;
    thickPlane.scale.z = 0;

    function rotateGroup() {
        const sliderValue = document.getElementById('rotationSlider').value;
        if (sliderValue == 2) {
            gsap.to(parentGroup.rotation, { duration: 1, x: Math.PI / 2 })
            gsap.to(plane.material, { duration: 2, opacity: 0});
            gsap.to(thickPlane.material, { duration: 2, opacity: 0 });
            gsap.to(thickPlane.scale, { duration: 2, z: 0 });
            
        } else if (sliderValue == 3) {
            gsap.to(parentGroup.rotation, { duration: 1, x: 0 })
            gsap.to(plane.material, { duration: 2, opacity: 1});
            gsap.to(thickPlane.material, { duration: 2, opacity: 0.2 });
            gsap.to(thickPlane.scale, { duration: 2, z: 0.9 });
        }
    }
    document.getElementById('rotationSlider').addEventListener('input', rotateGroup);
});

// camera____________________________________________________________________________________________________________
const sizes = {
    width: 600,
    height: 400
}

const camera = new THREE.OrthographicCamera(-10,10,10,-10,0.1,1000);
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