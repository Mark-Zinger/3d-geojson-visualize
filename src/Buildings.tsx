import * as THREE from 'three';
import {Line, Extrude} from '@react-three/drei'
import {createRef, useEffect, useState} from "react";
import getBuildingsData, {IBuilding} from "./helpers/getBuildingsData";

const buildingMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});

const Buildings = () => {

  const [buildingsData, setBuildingsData] = useState<IBuilding[]>([]);

  useEffect(()=> {
    fetch('/data.geojson')
      .then( result => result.json())
      .then( data => setBuildingsData( getBuildingsData(data) ));

  },[])

  return (
    <>{ buildingsData.map((data, i) => <Building key={i} {...data}/>) }
    </>
  )
}

const Building = (props: IBuilding) => {
  const {geometry, info} = props;

  console.log({props})
  const ref = createRef<THREE.Line>();

  useEffect(()=>{
    // console.log(ref)
  },[])

  return (
    <Extrude
      args={[
        geometry,
        {
          depth: 0.05*(info["building:levels"] ? info["building:levels"] : 1),
          steps: 1,
          // bevelEnabled:false,
          bevelSize: 0.01,
          bevelOffset: 0.05
        }

      ]}
      rotation={[ Math.PI / 2, Math.PI, 0]}
      material={buildingMaterial}
    />
  )
}


export default Buildings;