import * as THREE from 'three';
import {Line} from '@react-three/drei'
import {createRef, useEffect, useState} from "react";
import getBuildingsData, {IBuilding} from "./helpers/getBuildingsData";

const buildingMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

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
  const ref = createRef<THREE.Line>();

  useEffect(()=>{
    // console.log(ref)
  },[])

  return (
    <Line points={geometry} color={0xffffff}/>
  )
}


export default Buildings;