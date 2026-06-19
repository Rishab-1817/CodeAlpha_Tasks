import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

function GeometricAura() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050913);
    scene.fog = new THREE.FogExp2(0x050913, 0.01);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3.2, 2.1, 6.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.9;
    mountNode.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.75, 0.25, 0.7);
    bloomPass.threshold = 0.2;
    bloomPass.strength = 0.45;
    bloomPass.radius = 0.35;

    const effectComposer = new EffectComposer(renderer);
    effectComposer.addPass(renderScene);
    effectComposer.addPass(bloomPass);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.zoomSpeed = 1;
    controls.rotateSpeed = 1;
    controls.target.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0x1f2333);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xdfe8ff, 0.95);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0x445577, 0.35);
    backLight.position.set(-2, 1, -3);
    scene.add(backLight);

    const fillLight = new THREE.PointLight(0x7fd8ff, 0.28);
    fillLight.position.set(1.5, 1, 2);
    scene.add(fillLight);

    const colorLight = new THREE.PointLight(0xa88bff, 0.55);
    colorLight.position.set(1, 1, 2);
    scene.add(colorLight);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = 200 * (Math.random() - 0.5);
      starPositions[index * 3 + 1] = 100 * (Math.random() - 0.5);
      starPositions[index * 3 + 2] = 80 * (Math.random() - 0.5) - 40;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xaaceff, size: 0.06, transparent: true, opacity: 0.4 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const geometryIco = new THREE.IcosahedronGeometry(1.1, 0);
    const materialMain = new THREE.MeshStandardMaterial({
      color: 0x5a6a99,
      emissive: 0x0d1625,
      roughness: 0.34,
      metalness: 0.58,
      transparent: true,
      opacity: 0.78,
    });
    const coreMesh = new THREE.Mesh(geometryIco, materialMain);
    scene.add(coreMesh);

    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x7ab5ff, wireframe: true, transparent: true, opacity: 0.15 });
    const wireframeIco = new THREE.Mesh(geometryIco, wireframeMat);
    wireframeIco.scale.setScalar(1.08);
    scene.add(wireframeIco);

    const ringParticleCount = 1200;
    const ringGeometry = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringParticleCount * 3);
    const ringColors = new Float32Array(ringParticleCount * 3);
    for (let index = 0; index < ringParticleCount; index += 1) {
      const angle = (index / ringParticleCount) * Math.PI * 2;
      const radius = 1.45;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.35 * Math.sin(3 * angle);

      ringPositions[index * 3] = x;
      ringPositions[index * 3 + 1] = y;
      ringPositions[index * 3 + 2] = z;
      ringColors[index * 3] = 0.35 + 0.45 * Math.sin(angle);
      ringColors[index * 3 + 1] = 0.3 + 0.4 * Math.cos(1.7 * angle);
      ringColors[index * 3 + 2] = 0.55 + 0.25 * Math.sin(2.3 * angle);
    }
    ringGeometry.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    ringGeometry.setAttribute('color', new THREE.BufferAttribute(ringColors, 3));
    const ringMaterial = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending });
    const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
    scene.add(ringParticles);

    const torusMat = new THREE.MeshStandardMaterial({ color: 0x7ea1ff, emissive: 0x112244, roughness: 0.4, metalness: 0.72 });
    const torusRing = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.038, 64, 500), torusMat);
    scene.add(torusRing);

    const torusRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.024, 64, 500), new THREE.MeshStandardMaterial({ color: 0x9e83ff, emissive: 0x221144, roughness: 0.55, metalness: 0.58 }));
    scene.add(torusRing2);

    const cloudParticleCount = 800;
    const cloudGeo = new THREE.BufferGeometry();
    const cloudPositions = new Float32Array(cloudParticleCount * 3);
    for (let index = 0; index < cloudParticleCount; index += 1) {
      cloudPositions[index * 3] = 5 * (Math.random() - 0.5);
      cloudPositions[index * 3 + 1] = 3 * (Math.random() - 0.5);
      cloudPositions[index * 3 + 2] = 4 * (Math.random() - 0.5) - 1;
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    const cloudMat = new THREE.PointsMaterial({ color: 0x7788ff, size: 0.02, transparent: true, opacity: 0.24, blending: THREE.AdditiveBlending });
    const cloudPoints = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloudPoints);

    const gridHelper = new THREE.GridHelper(12, 24, 0x8899ff, 0x334455);
    gridHelper.position.y = -1.7;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.14;
    scene.add(gridHelper);

    let time = 0;
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      time += 0.012;

      coreMesh.rotation.y = 0.18 * time;
      coreMesh.rotation.x = 0.16 * Math.sin(0.37 * time);
      coreMesh.rotation.z = 0.11 * Math.cos(0.23 * time);
      wireframeIco.rotation.copy(coreMesh.rotation);
      ringParticles.rotation.y = 0.24 * time;
      ringParticles.rotation.x = 0.16 * Math.sin(0.28 * time);
      torusRing.rotation.x = Math.PI / 2;
      torusRing.rotation.z = 0.34 * time;
      torusRing2.rotation.x = Math.PI / 2 + 0.3;
      torusRing2.rotation.z = 0.42 * time;

      const hueOffset = (0.2 * time) % (Math.PI * 2);
      colorLight.color.setHSL(0.56 + 0.06 * Math.sin(hueOffset), 0.85, 0.58);
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0002;
      cloudPoints.rotation.y = 0.05 * time;
      cloudPoints.rotation.x = 0.1 * Math.sin(0.1 * time);
      controls.update();
      effectComposer.render();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effectComposer.setSize(window.innerWidth, window.innerHeight);
    };

    animate();
    window.addEventListener('resize', handleResize, false);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize, false);
      controls.dispose();
      effectComposer.dispose();
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      geometryIco.dispose();
      disposeMaterial(materialMain);
      disposeMaterial(wireframeMat);
      ringGeometry.dispose();
      ringMaterial.dispose();
      torusMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      gridHelper.geometry.dispose();
      disposeMaterial(gridHelper.material);

      if (renderer.domElement.parentNode === mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-auto absolute inset-0" />;
}

export default GeometricAura;