import * as THREE from "three";
import coordinateType from "../types/coordinateType";
import getGPSRelativePosition from "./getGPSRelativePosition";


function generateShape (points:coordinateType[], center:coordinateType) {
  const shape = new THREE.Shape();


  for(let i = 0; i < points.length; i++) {
    const position = getGPSRelativePosition(points[i], center);

    if(i === 0) {
      shape.moveTo(position[0], position[1]);
    } else {
      shape.lineTo(position[0], position[1]);
    }


  }
  // console.log(shape)
  return shape
}

export default generateShape;