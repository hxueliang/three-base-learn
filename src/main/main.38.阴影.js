/**
 * 目标：38.阴影
 * 1.材质要求
 * 2.灯光要求
 * 3.开启渲染器阴影
 * 4.开启光照投射阴影
 * 5.开启物体投射阴影
 * 6.开启物体接收阴影
 */
import * as THREE from 'three';
// 5.导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 37.导入RGBELoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';


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



// 38.添加球体(1-5)
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
// 38.4开启物体投射阴影
sphere.castShadow = true;
scene.add(sphere);
// 38.1添加平面
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2;
// 38.5开启物体接收阴影
plane.receiveShadow = true;
scene.add(plane);


// 25.1添加 环境光
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// 25.2添加 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 25.3设置平行光的位置
directionalLight.position.set(10, 10, 10);

// 38.3开启光照投射阴影
directionalLight.castShadow = true;

scene.add(directionalLight);


// 4.创建渲染器
const renderer = new THREE.WebGLRenderer();
// 4.1.设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight);

// 38.2开启渲染器阴影
renderer.shadowMap.enabled = true;

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
  caontrols.update();
  // 4.2使用渲染器，把场景渲染出来（通过相机）
  renderer.render(scene, camera);
  // 5.3渲染下一帧重新执行render函数
  requestAnimationFrame(render);
}
// 5.4执行渲染函数
render();


// 14.监听视口变化
window.addEventListener('resize', () => {
  console.log('resize');
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  // 更新摄像头宽高比
  camera.aspect = innerWidth / innerHeight;
  // 更新摄像头投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器大小
  renderer.setSize(innerWidth, innerHeight);
  // 更新渲染器像数比
  renderer.setPixelRatio(window.devicePixelRatio);
})

