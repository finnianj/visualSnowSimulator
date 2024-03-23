import React, { useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei'

export default function App() {
    const [map, setMap] = useState(0);

    return (
       <>
            <OrbitControls />
            <Environment
            background
                files={ [
                    `./environmentMaps/${map}/px.png`,
                    `./environmentMaps/${map}/nx.png`,
                    `./environmentMaps/${map}/py.png`,
                    `./environmentMaps/${map}/ny.png`,
                    `./environmentMaps/${map}/pz.png`,
                    `./environmentMaps/${map}/nz.png`,
                ] }
            />
       </>
    );
}