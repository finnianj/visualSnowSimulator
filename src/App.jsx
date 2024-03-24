import React, { useEffect, useState } from 'react';
import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'

const mapsArray = [
    'berlin', 
    'garden',
    'metro',
    'road'
]

export default function App() {
    const envMap = useEnvironment({ background: true, files: `./environmentMaps/hdri/${mapsArray[0]}.exr` })

    const changeMap = () => {
        const index = mapsArray.indexOf(map)
        const newIndex = (index + 1) % mapsArray.length
        setMap(mapsArray[newIndex])
    }



    return (
       <>
            <OrbitControls />
            <Environment
                background
                map={envMap}
            />
       </>
    );
}