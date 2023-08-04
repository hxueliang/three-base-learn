/**
 * 目标：25.标准网格材质(MeshStandardMaterial)
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

// 19.创建纹理
const textureLoader = new THREE.TextureLoader();
// 19.1.导入纹理
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');


// 22.导入透明纹理（黑白灰图，黑：全透明，白：不透明，灰：半透明）
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');

// 24.导入环境纹理
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');


// 0.基础配
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
// 25.创建标准网格材质
const cubeMaterial = new THREE.MeshStandardMaterial({
  // color: '#ffff00',
  // 19.2.设置纹理
  map: doorColorTexture,

  // 22.1使用透明纹理
  alphaMap: doorAlphaTexture,
  // 22.2允许透明
  transparent: true,

  // 23.设置两面
  side: THREE.DoubleSide,

  // 24.1使用环境纹理
  aoMap: doorAoTexture,
  // 24.3环境纹理强度（默认值：1）
  aoMapIntensity: 1,

});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
// 24.2给物体设置第二组uv
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)


// 25.1添加 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 25.2添加 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
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

