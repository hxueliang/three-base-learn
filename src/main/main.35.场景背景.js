/**
 * 目标：35.场景背景
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


// 33.设置加载管理器
const loaderManager = new THREE.LoadingManager(
  _ => { console.log('加载完成') },
  (imgUrl, counter, total) => {
    const progressValue = `${(counter / total * 100).toFixed(2)}%`
    console.log(`加载进度:${progressValue}  ${imgUrl}  ${counter}  ${total}`);
    progress.innerHTML = progressValue
  },
  e => { console.log('加载错误', e) },
);

// 34.设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
// 34.1加载6个方向的环境纹理贴图
const envMapTexture = cubeTextureLoader.load([
  'textures/environmentMaps/1/px.jpg',
  'textures/environmentMaps/1/nx.jpg',
  'textures/environmentMaps/1/py.jpg',
  'textures/environmentMaps/1/ny.jpg',
  'textures/environmentMaps/1/pz.jpg',
  'textures/environmentMaps/1/nz.jpg',
])
// 34.2创建球体
const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.1,
  metalness: 0.7,
  envMap: envMapTexture,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// 35.给场景设置背景
scene.background = envMapTexture



// // 0.基础配
// // 26.2添加分段数100, 100, 100
// const cubeGeometry = new THREE.BoxGeometry(2, 2, 2, 100, 100, 100);
// // 25.创建标准网格材质
// const cubeMaterial = new THREE.MeshStandardMaterial({
//   color: '#ffff00',
//   // 22.2允许透明
//   transparent: true,

//   // 23.设置两面
//   side: THREE.DoubleSide,

// });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);
// // 24.2给物体设置第二组uv
// cubeGeometry.setAttribute(
//   'uv2',
//   new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
// )


// 25.1添加 环境光
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// 25.2添加 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// 25.3设置平行光的位置
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);


// 4.创建渲染器
const renderer = new THREE.WebGLRenderer();
// 4.1.设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight);
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

