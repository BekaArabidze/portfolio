import { useEffect } from 'react';
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { fragment } from "./shaders/fragmentShader";
import { vertex } from "./shaders/vertexShader";

import { small_fragment } from "./shaders/small_fragmentShader";
import { small_vertex } from "./shaders/small_vertexShader";


import { DotScreenShader } from "./dotScreenShader"

import gsap from "gsap"


const Noise = () => {

    const init = () => {
        const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
        let composer: any



        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // SCENE
        const scene = new THREE.Scene();

        // CAMERA
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,
            1, 1000);
        camera.position.set(0, 0, 1.3);
        scene.add(camera)



        // CONTROLS
        // const controls = new OrbitControls(camera, canvas);
        // controls.enableDamping = true




        // RENDERER
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor(0xffffff, 0)





        function initPos() {
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));

            const effect1 = new ShaderPass(DotScreenShader);
            effect1.uniforms['scale'].value = 4;
            composer.addPass(effect1);
        }

        initPos()
        composer.setSize(sizes.width, sizes.height);



        let cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
            256,
            {
                format: THREE.RGBAFormat,
                generateMipmaps: true,
                minFilter: THREE.LinearMipMapLinearFilter,
                encoding: THREE.sRGBEncoding
            }
        )

        let cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

        let material = new THREE.ShaderMaterial(
            {
                uniforms: {
                    texture1: { value: null },
                    time: { value: 0 },
                    resolution: { value: new THREE.Vector4() }
                },
                vertexShader: vertex(),
                fragmentShader: fragment(),
                side: THREE.DoubleSide,
                // wireframe:true
                // transparent:true
            }
        )

        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const plane = new THREE.Mesh(geometry, material)
        scene.add(plane)


        const small_geometry = new THREE.SphereGeometry(0.2, 32, 32);
        ///! small sphere
        let small_material = new THREE.ShaderMaterial(
            {
                uniforms: {
                    tCube: { value: 0 },
                },
                vertexShader: small_vertex(),
                fragmentShader: small_fragment(),
                side: THREE.DoubleSide,
                // wireframe:true,
                // transparent:true
            }
        )


        const small_plane = new THREE.Mesh(small_geometry, small_material)
        scene.add(small_plane)





        //! plane will scale the screen change
        function scalePlaneWithScreen() {
            let imageAspect = sizes.height / sizes.width
            let a1 = 0; let a2 = 0;
            if (sizes.height / sizes.width > imageAspect) {
                a1 = (sizes.width / sizes.height) * imageAspect;
                a2 = 1
            } else {
                a1 = 1
                a2 = (sizes.height / sizes.width) / imageAspect
            }

            material.uniforms.resolution.value.x = sizes.width
            material.uniforms.resolution.value.y = sizes.height
            material.uniforms.resolution.value.z = a1
            material.uniforms.resolution.value.w = a2


            //calculate plane size and updates is shape according to screen size
            const dist = camera.position.z
            const height = 1
            camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist))

            if (sizes.width / sizes.height > 1) {
                plane.scale.x = camera.aspect
            } else {

                plane.scale.y = 1 / camera.aspect
            }

            camera.updateProjectionMatrix();
        }
        // scalePlaneWithScreen()


        if (window.innerWidth > 750) {
            window.addEventListener("resize", () => {
                sizes.width = window.innerWidth;
                sizes.height = window.innerHeight;

                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();

                renderer.setSize(sizes.width, sizes.height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

                //scalePlaneWithScreen()

            })

        }


        let time = 0
        const animate = () => {
            // controls.update()
            renderer.clear();


            time += 0.01
            material.uniforms.time.value = time


            small_plane.visible = false
            cubeCamera.update(renderer, scene)
            small_material.uniforms.tCube.value = cubeRenderTarget.texture
            small_plane.visible = true


            requestAnimationFrame(animate);
            // renderer.render(scene, camera);
            composer.render(scene, camera)
        }


        animate()
    }




    useEffect(() => {
        if (typeof window === 'object') init()


        let tl = gsap.timeline();


        tl.to('.nav-anim', {
            opacity: 1,
            translateX: 0,
            stagger: 0.1,
            duration: 0.3,
            delay: 2
        })
            .to('.hero-anim', {
                opacity: 1,
                translateY: 0,
                stagger: 0.2,
                duration: 0.5,
            })
            .fromTo('body', { overflow: 'hidden' }, { overflow: 'auto' });
    }, []);



    return (
        <div className='hero'>
            <canvas id="canvas"></canvas>

            <div className="introduction">
                <h1 className='hello f-size-p3 hero-anim'>
                    <span style={{ color: "var(--yellow_3)" }}>Hi</span>, my name is
                </h1>


                <h1 className='name f-size-h3 hero-anim'>
                    Beka arabidze
                </h1>
                <h1 className='developer f-size-h3 hero-anim'>
                    Full stack developer
                </h1>

                <h1 className='about-me f-size-p4 hero-anim'>
                    I am web developer almost 3 years of experience.
                    During these period I built several websites.
                    I have been Co-founder and developer of Oxeni development.
                </h1>



                <button className='check-more hero-anim'>
                    <a style={{ textDecoration: "none" }}
                        href="/beqa_arabidze(cv).pdf" target="_blank" rel="noreferrer" download>
                        <h1 className="f-weight-600 f-size-p3">
                            resume
                        </h1>
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Noise
