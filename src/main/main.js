/**
 * 目标：42.让点光源小球动起来
 */
import * as THREE from 'three';
// 5.导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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



// 38.添加球体(1-5)
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
// 38.4开启物体投射阴影
sphere.castShadow = true;
scene.add(sphere);
// 38.1添加平面
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2;
// 38.5开启物体接收阴影
plane.receiveShadow = true;
scene.add(plane);


// 25.1添加 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 41.添加 点光源【40.添加 聚光灯】【25.2添加 平行光】
const pointLight = new THREE.PointLight(0xff0000, 4);
// 25.3设置平行光的位置
// pointLight.position.set(2, 2, 2);
// 41.1创建小球
const lightBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
// 42.2将点光源添加到小球上
lightBall.add(pointLight);
lightBall.position.set(2, 2, 2);

// 38.3开启光照投射阴影
pointLight.castShadow = true;

// 39.模糊阴影的边缘
pointLight.shadow.radius = 20;
// 39.1设置阴影的宽度和高度(默认：512, 512)
pointLight.shadow.mapSize.set(4096, 4096);

// 42.3将小球添加到场景
scene.add(lightBall);

// 40.2添加gui
const gui = new dat.GUI();
gui.add(lightBall.position, 'x').min(-5).max(5).step(0.1)

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

// 11.设置时钟
const clock = new THREE.Clock();

// 5.2定义渲染函数
function render() {
  // 42.获取当前动画运行时间
  const time = clock.getElapsedTime();
  lightBall.position.x = Math.sin(time) * 2;
  lightBall.position.z = Math.cos(time) * 2;
  lightBall.position.y = 2 + Math.sin(time * 10) / 5;
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

