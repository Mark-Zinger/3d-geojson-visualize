import {FeatureCollection, GeoJsonProperties, Polygon} from "geojson";
import * as THREE from'three';
import coordinateType from "../types/coordinateType";
import generateShape from "./generateShape";
import generateGeometry from "./generateGeometry";


function getBuildingsData (data:FeatureCollection): IBuilding[] {
  const features = data.features;
  const result: IBuilding[] = [];

  for(let i=0; i < features.length; i++) {
    let fel = features[i];

    if(!fel["properties"]) continue;
    console.log(fel.geometry)

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
  }

  return result;
}

const center:coordinateType = [ 37.585332, 55.874575 ];

export interface IBuilding {
  geometry: any,
  info: GeoJsonProperties
}

function addBuilding (data: coordinateType[][], info: GeoJsonProperties, height=1): IBuilding {


    const points = data[0];
    const shape = generateShape(points, center);
    // const geometry = generateGeometry(shape, height);


  return {
    geometry: shape, info
  }
}




export default getBuildingsData