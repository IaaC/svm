// importing three
import { Color, LineBasicMaterial, Sprite} from "https://unpkg.com/three@0.172.0/build/three.module.js"; 
import * as THREE from "https://unpkg.com/three@0.172.0/build/three.module.js";

//importing gsap
// import * as gsap from "https://unpkg.com/gsap@3.12.6/dist/gsap.js";

// canvas 
const canvas = document.querySelector('canvas.webgl2')

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
    [1, 2.3, 0],
    [2, 5, 4], 
    [3, 4, 1], 
    [4,7, 3], 
    [5,5.5, 4]
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
    [7, 5, 0],
    [3, 1.7, 4], 
    [2, 1, 1], 
    [6,2, 3], 
    [6.5,4, 4]
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
//scene.add(axesGroup);

//DECISION PLANE
const decisionPlaneGroup = new THREE.Group();

const planeGeometry = new THREE.BoxGeometry(12, 12, 0.05); 
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

const thickGeometry = new THREE.BoxGeometry(10, 10, 0.7); 
const thickMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 0.2,
    transparent: true
});
const thickPlane = new THREE.Mesh(thickGeometry, thickMaterial);

const thickGeometry2 = new THREE.BoxGeometry(10, 10, 0.025); 
const thickMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true
});
const plane2 = new THREE.Mesh(thickGeometry2, thickMaterial2);

const thickGeometry3 = new THREE.BoxGeometry(10, 10, 0.025); 
const thickMaterial3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true
});
const plane3 = new THREE.Mesh(thickGeometry3, thickMaterial3);

const thickGeometry4 = new THREE.BoxGeometry(10, 10, 0.025); 
const thickMaterial4 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
    opacity: 1,
    transparent: true
});
const plane4 = new THREE.Mesh(thickGeometry4, thickMaterial4);

plane.translateX(5);
plane.translateY(4.4);
plane.rotateY(1.5708);
plane.rotateX(0.893);

thickPlane.translateX(5);
thickPlane.translateY(4.4);
thickPlane.rotateY(1.5708);
thickPlane.rotateX(0.893);

plane2.translateX(6);
plane2.translateY(4.4);
plane2.rotateY(1.5708);
plane2.rotateX(0.5);

plane3.translateX(4.5);
plane3.translateY(4.4);
plane3.rotateY(1.5708);
plane3.rotateX(2.3);

plane4.translateX(5);
plane4.translateY(3);
plane4.rotateY(1.5708);
plane4.rotateX(1.7);


decisionPlaneGroup.add(plane);
decisionPlaneGroup.add(thickPlane);
decisionPlaneGroup.add(plane2);
decisionPlaneGroup.add(plane3);
decisionPlaneGroup.add(plane4);
scene.add(decisionPlaneGroup);

// MOVE TO CENTER

const parentGroup = new THREE.Group();

parentGroup.add(...orangeSprites);
parentGroup.add(...appleSprites);
parentGroup.add(axesGroup);
parentGroup.add(decisionPlaneGroup);

scene.add(parentGroup);

parentGroup.position.set(-6., -7, 0);
parentGroup.scale.set(1.4,1.4);

// animation____________________________________________________________________________________________________________

document.addEventListener('DOMContentLoaded', () => {

    plane.material.opacity = 0; 
    thickPlane.material.opacity = 0;
    thickPlane.scale.z = 0;
    plane2.material.opacity = 0; 
    plane3.material.opacity = 0; 
    plane4.material.opacity = 0;

    function animatePlanes() {
        plane.material.opacity = 0;
        thickPlane.material.opacity = 0;
        thickPlane.scale.z = 0;
        plane2.material.opacity = 0;
        plane3.material.opacity = 0;
        plane4.material.opacity = 0;
    
        let timeline = gsap.timeline();
        timeline.to(plane4.material, { duration: 1, opacity: 1 })
                .to(plane4.material, { duration: 1, opacity: 0 }, "+=1")
                .to(plane3.material, { duration: 1, opacity: 1 })
                .to(plane3.material, { duration: 1, opacity: 0 }, "+=1")
                .to(plane2.material, { duration: 1, opacity: 1 })
                .to(plane2.material, { duration: 1, opacity: 0 }, "+=1")
                .to(plane.material, { duration: 1, opacity: 1 })
                .to(thickPlane.material, { duration: 1, opacity: 0.2 })
                .to(thickPlane.scale, { duration: 1, z: 0.7 });
                
    }
    document.getElementById('playButton').addEventListener('click', animatePlanes);
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