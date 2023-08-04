/**
 * 目标：了解three.js最基本的内容
 */
import * as THREE from 'three';


let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

// 1.创建场景
const scene = new THREE.Scene();


// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
// 2.1.设置相机位置
camera.position.set(0, 0, 10);
// 2.2.将相机添加到场景
scene.add(camera);


// 3.创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 3.1.创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 3.2.根据几何体和材质创建立方体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 3.3.将立方体添加到场景
scene.add(cube);


// 4.创建渲染器
const renderer = new THREE.WebGLRenderer();
// 4.1.设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight);
// 4.2.使用渲染器，把场景渲染出来（通过相机）
renderer.render(scene, camera);
// 4.3.将渲染的内容（即canvas画布）添加进body
document.body.appendChild(renderer.domElement);