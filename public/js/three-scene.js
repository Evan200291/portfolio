const canvas = document.querySelector('#hero-canvas');

if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js').then((THREE) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 6.7;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const group = new THREE.Group();
    scene.add(group);

    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.045, 10, 10);
    const nodePalette = [0x176b82, 0x5967a2, 0x2d765b, 0x9a651d];
    const nodeMaterials = nodePalette.map((color) => new THREE.MeshBasicMaterial({ color }));

    for (let i = 0; i < 74; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / 74);
      const theta = Math.sqrt(74 * Math.PI) * phi;
      const radius = 2.05 + Math.sin(i * 1.9) * 0.08;
      const point = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodes.push(point);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterials[i % nodeMaterials.length]);
      node.position.copy(point);
      group.add(node);
    }

    nodes.forEach((point, index) => {
      let connected = 0;
      for (let j = index + 1; j < nodes.length && connected < 3; j += 1) {
        if (point.distanceTo(nodes[j]) < 1.05) {
          const geometry = new THREE.BufferGeometry().setFromPoints([point, nodes[j]]);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: nodePalette[(index + connected) % nodePalette.length],
            transparent: true,
            opacity: 0.16
          });
          group.add(new THREE.Line(geometry, lineMaterial));
          connected += 1;
        }
      }
    });

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.82, 2),
      new THREE.MeshBasicMaterial({ color: 0x5967a2, transparent: true, opacity: 0.12, wireframe: true })
    );
    group.add(core);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(360);
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - .5) * 12;
      starPositions[i + 1] = (Math.random() - .5) * 12;
      starPositions[i + 2] = (Math.random() - .5) * 8;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x7d8f9a, size: .018, transparent: true, opacity: .28 }));
    scene.add(stars);

    let pointerX = 0;
    let pointerY = 0;
    canvas.addEventListener('pointermove', (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - .5) * .5;
      pointerY = ((event.clientY - rect.top) / rect.height - .5) * .35;
    });

    function resize() {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    const clock = new THREE.Clock();
    function animate() {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * .065 + pointerX;
      group.rotation.x += (pointerY - group.rotation.x) * .035;
      core.rotation.x = elapsed * .18;
      core.rotation.z = elapsed * .12;
      stars.rotation.y = elapsed * .01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }).catch(() => {
    canvas.closest('.scene-shell')?.classList.add('scene-fallback');
  });
}
