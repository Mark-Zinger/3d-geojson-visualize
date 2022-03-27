import * as THREE from "three";



function generateGeometry (shape: THREE.Vector3[], height:number) {
  console.log(shape)
  // const config = {
  //   steps: 1,
  //   depth: 16,
  //   bevelEnabled: true,
  //   bevelThickness: 1,
  //   bevelSize: 1,
  //   bevelOffset: 0,
  //   bevelSegments: 1
  // };


  const geometry = new THREE.BufferGeometry().setFromPoints(shape)
  geometry.computeBoundingBox();
  geometry.rotateX(Math.PI);
  geometry.rotateZ(Math.PI)

  return geometry;
}

export default generateGeometry;