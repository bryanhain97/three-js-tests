import './index.css';
import * as THREE from 'three'


const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement
const scene = new THREE.Scene()

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xff0000)
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)



// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 3



// Scene
scene.add(box)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

const animate = () => {
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}
animate()