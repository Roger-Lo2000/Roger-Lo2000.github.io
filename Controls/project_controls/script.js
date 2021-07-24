let scene, renderer, camera
let cube,controls,rotateAngle
var mesh 
// 初始化場景、渲染器、相機、物體
function init() {
  // 建立場景
  scene = new THREE.Scene()

  // 建立渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
  renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
  renderer.shadowMap.enable = true // 陰影效果
  renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

  // 將渲染器的 DOM 綁到網頁上
  document.body.appendChild(renderer.domElement)

  // 建立相機
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(25,5,25)
  // camera.lookAt(scene.position)
  controls = new THREE.FirstPersonControls( camera, renderer.domElement)
  controls.lookSpeed = 0.1; //Mouse viewing speed
  controls.movementSpeed = 10; //Camera movement speed
  controls.noFly = false;
  controls.constrainVertical = true; //Constrain vertical
  controls.verticalMin = 1.0;
  controls.verticalMax = 2.0;
  controls.lon = -100; //Enter the initial angle of view x-axis
  controls.lat = 0; //The angle of the y-axis after the initial perspective enters
  
  // 建立光源
  // let spotLight = new THREE.SpotLight(0xf0f0f0)
  // spotLight.position.set(5, 5, 5)
  // spotLight.castShadow = true
  // scene.add(spotLight)
  // 小球體模擬點光源實體
  const sphereLightGeo = new THREE.SphereGeometry(0.1)
  const sphereLightMat = new THREE.MeshBasicMaterial({ color: 0xccffcc })
  sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat)
  sphereLightMesh.castShadow = true
  sphereLightMesh.recieveShadow = false
  sphereLightMesh.position.set(5, 5, 5)
  scene.add(sphereLightMesh)
  //移動點光源
  pointLight = new THREE.PointLight("white") 
  pointLight.position.set(5, 5, 5)
  pointLight.castShadow = true // 投影
  scene.add(pointLight)



  let ambientLight = new THREE.AmbientLight("white",0.15)
  scene.add(ambientLight)
  //建立座標輔助
  let axes = new THREE.AxesHelper(20) // 參數為座標軸長度
  scene.add(axes) 
  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) 
  // 材質
  cube = new THREE.Mesh(geometry, material) // 建立網格物
  cube.position.set(1, 1, 1)
  cube.castShadow = true
  cube.receiveShadow =false
  scene.add(cube)
  //建立地板
  const planeGeometry = new THREE.PlaneGeometry(60, 60)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  let plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI // 使平面與 y 軸垂直，並讓正面朝上
  plane.position.set(0, 0, 0)
  plane.receiveShadow = true
  scene.add(plane)

}

// 建立動畫
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01
}
var clock = new THREE.Clock();
// 渲染場景
function render() {
  
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  controls.update(clock.getDelta());
  animate()
}

// 監聽螢幕寬高來做簡單 RWD 設定
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()
render()

