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
            size: 1,
            height: 0.1,
            curveSegments: 6,
            bevelSegments: 6,
            // bevelEnabled: true,
            // bevelSize: 0,
            // bevelThickness: 0,
            // bevelOffset: 0
        }
    )
    text.geometry = textGeometry
    text.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffcc),
        wireframe: true
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

// GUI Debugging

// Material
// const material = new THREE.MeshStandardMaterial({
//     // color: 0xffaaaa,
//     // wireframe: true
//     // flatShading: true
//     roughness: 0.4,
//     metalness: 0.1
// })
// Geometries
// const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 10, 10)
// const sphere = new THREE.Mesh(sphereGeometry, material)
// sphere.position.set(-2, 0, 0)
// const planeGeometry = new THREE.PlaneBufferGeometry(1, 1)
// const plane = new THREE.Mesh(planeGeometry, material)
// plane.material.side = THREE.DoubleSide
// const torusGeometry = new THREE.TorusBufferGeometry(0.4, 0.1, 15, 15)
// const torus = new THREE.Mesh(torusGeometry, material)
// torus.position.x = 2
// const textGeometry = new TextBufferGeometry('Threejs Bryan Hain', )

// Camera // Controls
const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 0.01, 1000)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.z = 7
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
// Light
// const ambientLight = new THREE.AmbientLight(0xfff, 1)
const pointLight = new THREE.PointLight(0x00ffaa, 1, 100)
pointLight.position.set(2, 2, 2)
// Scene
scene.add(camera)
// scene.add(sphere)
// scene.add(plane)
// scene.add(torus)
scene.add(pointLight)
// scene.add(ambientLight)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.x, sizes.y)

const animate = () => {
    text.rotation.y += 0.01
    renderer.render(scene, camera)
    controls.update()
    window.requestAnimationFrame(animate)
}
animate()