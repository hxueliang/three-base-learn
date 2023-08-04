/**
 * 目标：10.通过time参数保证动画不卡顿
 */
import * as THREE from 'three';
// 5.导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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

// 7.修改物体位置
// cube.position.set(5, 0, 0); // cube.position.x = 2.5;

// 8.物体缩放
// cube.scale.set(3, 2, 1); // cube.scale.x = 2.5;

// 9.物体旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// 3.3.将立方体添加到场景
scene.add(cube);


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
const a = new OrbitControls(camera, renderer.domElement);
// 5.2定义渲染函数
function render(time) {
  console.log(time)
  // 10.通过time参数得动画实际运行时长
  const t = time / 1000 % 5;
  cube.position.x = t * 1; // 1为速度

  // // 9.1让物体转起来
  // cube.rotation.x += 0.01;
  // 【4.2.】使用渲染器，把场景渲染出来（通过相机）
  renderer.render(scene, camera);
  // 渲染下一帧重新执行render函数
  requestAnimationFrame(render);
}
// 5.3执行渲染函数
render();