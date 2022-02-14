import React, { Component } from "react";
import reactDom from "react-dom";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Color } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.2,
      1000
    );
    this.setState({ camera: camera });
    var renderer = new THREE.WebGLRenderer();

    //  const controls = new OrbitControls(camera, renderer.domElement)
    //controls.autoRotate = true;
    //controls.enabled = false;
    //controls.center = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);
    //cube cude
    //end of cube

    var cubeList = [];

    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        var material = new THREE.MeshBasicMaterial({
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`,
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = Math.random() * x;
        cube.position.z = Math.random() * z;

        //  scene.add( cube );

        cubeList.push(cube);
      }
    }

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    //cene.add( gridHelper );

    camera.position.z = 5;
    // controls.update();

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshBasicMaterial({
        color: new Color("#fffff"),
      });
      const star = new THREE.Mesh(geometry, material);

      const [x, z] = Array(2)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(80));
      const [y] = Array(1)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(500));

      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(1000).fill().forEach(addStar);

    var animate = function () {
      requestAnimationFrame(animate);

      camera.rotation.y += 0.0025;
      for (cube of cubeList) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }

      // controls.update();
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  handleScroll = (e) => {
    this.state.camera.position.y = -document.documentElement.scrollTop / 10;
    console.log(document.body.scrollTop);
  };

  render() {
    return (
      <div className="screen" onScroll={this.handleScroll.bind(this)}>
        <div className="title">
          <h1>Hi, I'm Christo.</h1>
          <br></br>
          <h1>A Software Engineer.</h1>
        </div>

        <div className="projectHeader">
          <h1>Projects.</h1>
        </div>

        <div className="grid-container">
          <div className="grid-item">Myntora</div>
          <div className="grid-item">2</div>
          <div className="grid-item">3</div>
          <div className="grid-item">4</div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
