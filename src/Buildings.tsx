import * as THREE from 'three';
import {Line, Extrude} from '@react-three/drei'
import {createRef, useEffect, useState} from "react";
import getBuildingsData, {IMapItem} from "./helpers/getBuildingsData";

const buildingMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});

const Buildings = () => {

  const [buildingsData, setBuildingsData] = useState<IMapItem[]>([]);

  useEffect(()=> {
    fetch('/data.geojson')
      .then( result => result.json())
      .then( data => setBuildingsData( getBuildingsData(data) ));

  },[])

  return (
    <>{ buildingsData.map((data, i) => {
      console.log(data.type)
      if(data.type === "building") {
        return <Building key={i} {...data}/>
      } else {
        return <Road key={i} {...data}/>
      }
    }) }
    </>
  )
}

const Building = (props: IMapItem) => {
  //@ts-ignore
  const {shape, info} = props;

  // console.log({props})
  const ref = createRef<THREE.Line>();

  useEffect(()=>{
    // console.log(ref)
  },[])

  return (
    <Extrude
      args={[
        shape,
        {
          depth: 0.05*(info["building:levels"] ? info["building:levels"] : 1),
          steps: 1,
          bevelEnabled:false,
          bevelSize: 0.01,
          bevelOffset: 0.05
        }

      ]}
      rotation={[ Math.PI / 2, Math.PI, 0]}
      material={buildingMaterial}
    />
  )
}

const Road = (props: IMapItem)  => {
  //@ts-ignore
  const {points, info} = props;
  console.log({info})

  return (
    <Line
      points={points}
      rotation={[ Math.PI, Math.PI, 0]} color={0x2f9bff}
      lineWidth={1 * (info.lanes || 1)}
    />
  )
}

export default Buildings;