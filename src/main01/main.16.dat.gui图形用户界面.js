/**
 * 目标：16.使用图形用户界面dat.gui
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


// 16.1.创建dat.gui
const gui = new dat.GUI();
// 16.2.为cube.position的x属性添加图形界面
gui
  .add(cube.position, 'x')
  .min(0).max(5)
  .step(0.01)
  .name('cube的x轴')
  .onChange(value => console.log(value))// 类似input事件
  .onFinishChange(value => console.log(value)) // 类似chage事件

// 16.3显示隐藏物体
gui.add(cube, 'visible').name('cube显隐');
// 16.4参数
const params = {
  color: '#ffff00',
  fn() {
    gsap.to(cube.position, {
      x: 5,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.in'
    })
  }
};
// 16.5修改颜色
gui
  .addColor(params, 'color')
  .name('cube颜色')
  .onChange(value => {
    console.log(value)
    cube.material.color.set(value)
  })
// 16.6点击触发事件
gui.add(params, 'fn').name('cule左右移动');
// 16.7添加文件夹
const folder = gui.addFolder('设置cule');
folder.add(cube.material, 'wireframe').name('线框显示')

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


// 11.设置时钟
const clock = new THREE.Clock();




// 5.1创建轨道控制器
const caontrols = new OrbitControls(camera, renderer.domElement);

// 13.设置控制器阻尼
caontrols.enableDamping = true;

// 5.2定义渲染函数
function render() {
  // 13.1配合控制器阻尼
  caontrols.update()

  // 【4.2.】使用渲染器，把场景渲染出来（通过相机）
  renderer.render(scene, camera);
  // 渲染下一帧重新执行render函数
  requestAnimationFrame(render);
}
// 5.3执行渲染函数
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


// 15.监听双击事件
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen(); // 元素全屏
  } else {
    document.exitFullscreen(); // 文档退出全屏
  }
})

