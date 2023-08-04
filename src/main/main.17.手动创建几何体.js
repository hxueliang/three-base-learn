/**
 * 目标：17.手动创建几何体
 */
import * as THREE from 'three';
// 5.导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 12.导入gsap
import gsap from 'gsap';
// 16.导入dat.gui
import * as dat from 'dat.gui';


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

/*
// 3.创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 3.1.创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 3.2.根据几何体和材质创建立方体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 3.3.将立方体添加到场景
scene.add(cube);
console.log(cube);
console.log(cubeGeometry);
console.log(cube.geometry === cubeGeometry);
*/

// 17.创建几何体
const geometry = new THREE.BufferGeometry()
// 17.1创建顶点
const vertices = new Float32Array([
  -1, -1, 1,
  1, -1, 1,
  1, 1, 1,

  1, 1, 1,
  -1, 1, 1,
  -1, -1, 1
])
// 17.2设置几何体的position属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// 17.3创建材质
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 17.4根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);
const cube = mesh; // 兼容旧代码
// 17.5将物体添加到场景
scene.add(mesh);


// 4.创建渲染器
const renderer = new THREE.WebGLRenderer();
// 4.1.设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight);
// 4.2.使用渲染器，把场景渲染出来（通过相机）
// renderer.render(scene, camera);
// 4.3.将渲染的内容（即canvas画布）添加进body
document.body.appendChild(renderer.domElement);


// 6.添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
// 6.1.将坐标轴添加到场景
scene.add(axesHelper);


// 5.1创建轨道控制器
const caontrols = new OrbitControls(camera, renderer.domElement);

// 13.设置控制器阻尼
caontrols.enableDamping = true;
// 13.1.阻尼惯性有多小
caontrols.dampingFactor = 0.05;

// 5.2定义渲染函数
function render() {
  // 13.2配合控制器阻尼
  caontrols.update()

  // 【4.2.】使用渲染器，把场景渲染出来（通过相机）
  renderer.render(scene, camera);
  // 渲染下一帧重新执行render函数
  requestAnimationFrame(render);
}
// 5.3执行渲染函数
render();
