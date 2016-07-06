var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var controls = new THREE.FirstPersonControls( camera );

controls.movementSpeed = 0.1;
controls.lookSpeed = 0.01;
controls.noFly = true;
controls.lookVertical = false;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var BarChart = function(data) {
  var bars = [];
  data.forEach(function(height, idx) {
    bars.push(this._createCube(idx * 1.1, height));
  }, this);
};

BarChart.prototype._createCube = function(pos, height) {
  var colors = [
    'FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF'
  ];
  var geometry = new THREE.BoxGeometry( 1, height, 1 );
  var material = new THREE.MeshBasicMaterial( { color: colors[Math.floor(Math.random()*colors.length)] } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos, height/2, 0);
  scene.add(cube);
  return cube;
};

var bc = new BarChart([1, 3, 1, 5, 2, 10]);

camera.position.z = 5;
camera.position.y = 2;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
  controls.update(1);
}
render();
