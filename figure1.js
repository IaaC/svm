//importing three
import { Color, LineBasicMaterial, Sprite } from "https://unpkg.com/three@0.172.0/build/three.module.js"; 
import * as THREE from "https://unpkg.com/three@0.172.0/build/three.module.js";

//importing gsap
import { gsap } from "https://unpkg.com/gsap@3.12.7/dist/gsap.js";

// canvas 
const canvas = document.querySelector('canvas.webgl1')

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

const thickGeometry = new THREE.BoxGeometry(10, 10, 0.55); 
const thickMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 0.2,
    transparent: true
});
const thickPlane = new THREE.Mesh(thickGeometry, thickMaterial);

decisionPlaneGroup.add(plane);
decisionPlaneGroup.add(thickPlane);
decisionPlaneGroup.translateX(5);
decisionPlaneGroup.translateY(4.4);
decisionPlaneGroup.rotateY(1.5708);
decisionPlaneGroup.rotateX(0.893);
//scene.add(decisionPlaneGroup);

// MOVE TO CENTER

const parentGroup = new THREE.Group();

parentGroup.add(...orangeSprites);
parentGroup.add(...appleSprites);
parentGroup.add(axesGroup);
parentGroup.add(decisionPlaneGroup);

scene.add(parentGroup);

parentGroup.position.set(-7, -2, 0);


// HIGHLIGHT EFFECT__________________________________________________________________________________________________

function desaturateAndBlur(objects, duration) {
    objects.forEach(obj => {
        gsap.to(obj.material.color, { duration: duration, r: 0.5, g: 0.5, b: 0.5 });
        gsap.to(obj.material, { duration: duration, opacity: 0.5 });
    });
}

function resetObjects(objects, duration) {
    objects.forEach(obj => {
        gsap.to(obj.material.color, { duration: duration, r: obj.userData.originalColor.r, g: obj.userData.originalColor.g, b: obj.userData.originalColor.b });
        gsap.to(obj.material, { duration: duration, opacity: obj.userData.originalOpacity });
    });
}

[...orangeSprites, ...appleSprites, plane, thickPlane].forEach(obj => {
    obj.userData.originalColor = {
        r: obj.material.color.r,
        g: obj.material.color.g,
        b: obj.material.color.b
    };
    obj.userData.originalOpacity = obj.material.opacity;
});

document.querySelectorAll('.keyword').forEach(keyword => {
    keyword.addEventListener('mouseover', (event) => {
        const type = event.target.getAttribute('data-type');
        
        switch (type) {
            case 'hyperplane':
                desaturateAndBlur([...orangeSprites, ...appleSprites, thickPlane], 0.5);
                break;
            case 'support_vectors':
                desaturateAndBlur([plane, thickPlane], 0.5);
                break;
            case 'margin':
                desaturateAndBlur([...orangeSprites, ...appleSprites, plane], 0.5);
                break;
        }
    });

    keyword.addEventListener('mouseout', () => {
        resetObjects([...orangeSprites, ...appleSprites, plane, thickPlane], 0.5);
    });
});

// camera____________________________________________________________________________________________________________

const sizes = {
    width: 800,
    height: 600
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
