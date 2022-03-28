import * as THREE from 'three'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {MapControls, OrbitControls, Stars, Stats} from "@react-three/drei";
import Buildings from "./Buildings";

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
    </mesh>
  )
}

const App = () => {

  /*
    x: -2.6386437562300196
    y: 2.8412737707525477
    z: -5.8060430479653515
  *
  * */


  return (/*@ts-igonre*/
    <Canvas camera={{position: [-2.6386437562300196, 2.8412737707525477, -5.8060430479653515]}} onCreated={(gl) => {
      // @ts-ignore
      window.gl = gl
    }}>
      <ambientLight args={[0xfafafa, 0.25]}/>
      <pointLight args={[0xfafafa, 0.4]} position={[200, 90, 40]}/>
      <pointLight args={[0xfafafa, 0.4]} position={[200, 90, -40]}/>
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        screenSpacePanning={false}
        maxDistance={800}
      />
      <Buildings/>
      <gridHelper args={[16, 36, 0x555555, 0x333333]}/>
      <Stats/>
      {/*<Box position={[-1.2, 0, 0]}/>*/}
      {/*<Box position={[1.2, 0, 0]}/>*/}
    </Canvas>
  )
}


export default App;
