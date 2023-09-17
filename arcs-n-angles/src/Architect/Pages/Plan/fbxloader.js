import React, { Component } from "react";
import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

class Image extends Component {
    componentDidMount() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        this.mount.appendChild(renderer.domElement);

        camera.position.z = 5;

        const loader = new FBXLoader();

        loader.load('assets/aj.fbx', (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            console.log("Adding FBX resource to the scene.");
            scene.add(fbx);
        })
        renderer.render(scene, camera);
    }
    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}
export default Image;