var container;
var camera, scene, renderer;
var uniforms = {};
var startTime;

init();
animate();

  function onDocumentMouseMove(event) {
    uniforms.mousePosition.value = new THREE.Vector2(event.clientX, event.clientY);
  }

function init() {
  container = document.getElementById( 'container' );
  startTime = Date.now();
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  var geometry = new THREE.PlaneBufferGeometry(2, 2 );
  uniforms.iGlobalTime = {type:'f',value: 0.2};
  uniforms.mousePosition = {type:'v2',value:new THREE.Vector2(0, 0)};

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  renderer = new THREE.WebGLRenderer();
  container.appendChild( renderer.domElement );
  document.getElementById("container").addEventListener("mousemove", function(event) {
    onDocumentMouseMove(event);
});
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  var currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.001;
  renderer.render( scene, camera );
}
