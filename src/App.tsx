import React, { useEffect, useState, Suspense, startTransition, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";

import { Environment, useEnvironment, OrbitControls } from '@react-three/drei'

const mapsArray = [
    'berlin', 
    'garden',
    'metro',
    'road'
]

export default function App() {
    const [mapIndex, setMapIndex] = useState(0)
    const envMap = useMemo(() => useEnvironment({ files: `./environmentMaps/hdri/${mapsArray[mapIndex]}.exr` }), [mapIndex]);
    const [loadingMap, setLoadingMap] = useState(false)

    const changeMap = useCallback(() => {
        setLoadingMap(true)
            // setMapIndex((prevIndex) => (prevIndex + 1) % mapsArray.length);
        startTransition(() => {
            setTimeout(() => {
                setMapIndex((prevIndex) => (prevIndex + 1) % mapsArray.length);
                setLoadingMap(false)
            }, 3000);
        });
    }, [mapsArray.length]);



    return (
       <>
            <button onClick={changeMap} className='bg-teal-400 hover:bg-teal-500 transition-all text-white rounded-lg absolute z-50 p-4 m-4 shadow-lg'>Change Map</button>
            {loadingMap && <div className='loading-indicator'>Loading...</div>}
            <Canvas>
                <OrbitControls />
                <Suspense fallback={<div className='text-4xl z-50 absolute'>Loading environment...</div>}>
                <Environment
                    background
                    map={envMap}
                />
                </Suspense>
            </Canvas>
       </>
    );
}
