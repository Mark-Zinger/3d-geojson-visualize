import * as THREE from "three";



function generateGeometry (shape: THREE.Vector3[], height:number) {
  console.log(shape)

  const geometry = new THREE.BufferGeometry().setFromPoints(shape)
  geometry.computeBoundingBox();
  geometry.rotateX(Math.PI);
  geometry.rotateZ(Math.PI)

  return geometry;
}

export default generateGeometry;