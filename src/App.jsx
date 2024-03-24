import React, { useEffect, useState } from 'react';
import { Environment, OrbitControls, } from '@react-three/drei'

export default function App() {
    const [mapFiles, setMapFiles] = useState([
        `./environmentMaps/0/px.png`,
        `./environmentMaps/0/nx.png`,
        `./environmentMaps/0/py.png`,
        `./environmentMaps/0/ny.png`,
        `./environmentMaps/0/pz.png`,
        `./environmentMaps/0/nz.png`,
    ]);

    const changeMapFiles = (index) => {
        const newMap = [
            `./environmentMaps/${index}/px.png`,
            `./environmentMaps/${index}/nx.png`,
            `./environmentMaps/${index}/py.png`,
            `./environmentMaps/${index}/ny.png`,
            `./environmentMaps/${index}/pz.png`,
            `./environmentMaps/${index}/nz.png`,
        ]
        setMapFiles(newMap);
    }

    return (
       <>
            <OrbitControls />
            <Environment
                background
                files={mapFiles}
            />
       </>
    );
}

// export const presetsObj = {
//   apartment: 'lebombo_1k.hdr',
//   city: 'potsdamer_platz_1k.hdr',
//   dawn: 'kiara_1_dawn_1k.hdr',
//   forest: 'forest_slope_1k.hdr',
//   lobby: 'st_fagans_interior_1k.hdr',
//   night: 'dikhololo_night_1k.hdr',
//   park: 'rooitou_park_1k.hdr',
//   studio: 'studio_small_03_1k.hdr',
//   sunset: 'venice_sunset_1k.hdr',
//   warehouse: 'empty_warehouse_01_1k.hdr',
// }