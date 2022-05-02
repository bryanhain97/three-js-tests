import './index.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import GUI from 'lil-gui'

const gui = new GUI()
const fontLoader = new FontLoader()
const text = new THREE.Mesh()
fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', font => {
    const textGeometry = new TextGeometry('thatguybryan',
        {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelSegments: 6,
            bevelEnabled: true,
            bevelSize: 0.03,
            bevelThickness: 0.03,
            bevelOffset: 0
        }
    )
    text.geometry = textGeometry
    text.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xbbbbaa),
        flatShading: true,
        roughness: 0.3,
        metalness: 0.4
    })
    text.geometry.center()
    scene.add(text)
})
const sizes = {
    x: window.innerWidth,
    y: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement
const scene = new THREE.Scene()


// Camera // Controls
const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 0.01, 1000)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.z = 10
camera.lookAt(text.position)
controls.update()
// camera.aspect = sizes.x/sizes.y

// Resize Window
window.addEventListener('resize', () => {
    [sizes.x, sizes.y] = [window.innerWidth, window.innerHeight]
    setTimeout(() => {
        camera.aspect = sizes.x / sizes.y
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.x, sizes.y)
    }, 1000)
})


// Geometries
const planeGeometry = new THREE.PlaneBufferGeometry(5, 5)
const planeMaterial = new THREE.MeshStandardMaterial()
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.material.color = new THREE.Color(0xffffff)
plane.material.side = THREE.DoubleSide
plane.material.transparent = true
plane.position.set(0, 0, -3)
plane.material.opacity = 0.8
scene.add(plane)
// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity', 0.1, 1, 0.01)
// const pointLight = new THREE.PointLight(0xffffaa, 0.5, 100)
// pointLight.position.set(2, 2, 2)
const spotLight = new THREE.SpotLight(0xffff99, 0.8)
spotLight.angle = Math.PI * 0.05
// const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0xffffff)
spotLight.position.set(- 5.5, 3, 11)
gui.add(spotLight.position, 'x', -10, 10, 0.1)
gui.add(spotLight.position, 'y', 0.1, 10, 0.1)
gui.add(spotLight.position, 'z', 0.1, 20, 0.1)

scene.add(spotLight)
// scene.add(spotLight, spotLightHelper)

// Scene
scene.add(camera)
// scene.add(sphere)
// scene.add(plane)
// scene.add(torus)
// scene.add(pointLight)
scene.add(ambientLight)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.x, sizes.y)

const animate = () => {
    renderer.render(scene, camera)
    controls.update()
    plane.rotation.y += Math.PI * 0.01
    // spotLightHelper.update()
    window.requestAnimationFrame(animate)
}
animate()