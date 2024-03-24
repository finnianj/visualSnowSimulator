import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import './style.css'

import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'

const mapsArray = [
    'berlin', 
    'garden',
    'metro',
    'road'
]

export default function App() {
    const envMap = useEnvironment({ files: `./environmentMaps/hdri/${mapsArray[0]}.exr` })

    // const changeMap = () => {
    //     const index = mapsArray.indexOf(map)
    //     const newIndex = (index + 1) % mapsArray.length
    //     setMap(mapsArray[newIndex])
    // }



    return (
       <>
        <div className="bg-red-500 text-green-500">hjbkjhb
            <Canvas>
                <OrbitControls />
                <Environment
                    background
                    map={envMap}
                />
            </Canvas>
        </div>
       </>
    );
}
