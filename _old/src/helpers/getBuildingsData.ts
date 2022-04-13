import {FeatureCollection, GeoJsonProperties, Polygon} from "geojson";
import * as THREE from'three';
import coordinateType from "../types/coordinateType";
import generateShape from "./generateShape";
import generateGeometry from "./generateGeometry";
import getGPSRelativePosition from "./getGPSRelativePosition";


function getBuildingsData (data:FeatureCollection): IMapItem[] {
  const features = data.features;
  const result: IMapItem[] = [];

  console.log(data)

  for(let i=0; i < features.length; i++) {
    let fel = features[i];

    if(!fel["properties"]) continue;
    // console.log(fel.geometry)

    if(fel.properties["building"]) {
      result.push(
        addBuilding(
          //@ts-ignore
          fel.geometry.coordinates,
          fel.properties,
          fel.properties["building:levels"],
      ))
      // break;
    }

    if(fel.properties["highway"] && fel.geometry.type === "LineString") {
      result.push(
        addRoad(fel.geometry.coordinates as coordinateType[], fel.properties)
      )
      // break;
    }
  }

  return result;
}

const center:coordinateType = [ 37.680178, 55.777210 ];

export type IMapItem  = {
  type: "building"
  shape: THREE.Shape,
  info: any
} | {
  type: "road",
  points: THREE.Vector3[],
  info: any
}

function addRoad (_points: coordinateType[], info: any):IMapItem {
  const points = _points.map(cordinate => {
    const rPosition = getGPSRelativePosition(cordinate, center);
    return new THREE.Vector3(rPosition[0],0,rPosition[1]);
  })
  return {
    type: "road",
    points,
    info
  }
}

function addBuilding (data: coordinateType[][], info: GeoJsonProperties, height=1): IMapItem {


    const points = data[0];
    const shape = generateShape(points, center);

  return {
    type:"building",shape, info
  }
}




export default getBuildingsData