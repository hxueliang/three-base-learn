/**
 * 目标：21.修改纹理的显示算法
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
const doorColorTexture = textureLoader.load('./textures/door/ls.jpg');

/*
// 20.纹理偏移
// doorColorTexture.offsået.set(0.5, 0, 0); // doorColorTexture.offset.x = 0.5

// 20.1纹理旋转
// doorColorTexture.rotation = Math.PI / 4;
// 20.2旋转的原点
// doorColorTexture.center.set(0.5, 0.5);

// 20.3纹理重复
doorColorTexture.repeat.set(2, 4);
// 20.4重复的模式（默认值：重复图片边缘）
doorColorTexture.wrapS = THREE.RepeatWrapping; // 平铺
doorColorTexture.wrapT = THREE.MirroredRepeatWrapping; // 镜向
*/

// 21.纹理的显示算法（默认值：THREE.LinearFilter获取四个最接近的纹素，并在他们之间进行双线性报插值）
doorColorTexture.minFilter = THREE.NearestFilter; // 使用最接近的纹素值
doorColorTexture.magFilter = THREE.NearestFilter;


// 0.基础配
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({
  // 19.2.设置纹理
  map: doorColorTexture
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);



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

