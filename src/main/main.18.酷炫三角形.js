/**
 * 目标：18.打造酷炫三角形
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


/*
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
*/

// 18.循环创建50个三角形
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    vertices[j] = Math.random() * 5 - 2.5
  }
  console.log(vertices);
  // 17.2设置几何体的position属性
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // 18.1创建随机颜色
  const color = new THREE.Color(Math.random(), Math.random(), Math.random(), 0.5);
  // 17.3创建材质
  const material = new THREE.MeshBasicMaterial({ color, opacity: 0.5, transparent: true });
  // 17.4根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material);
  // 17.5将物体添加到场景
  scene.add(mesh);
}



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

