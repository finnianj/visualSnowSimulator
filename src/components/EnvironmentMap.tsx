import { startTransition, useEffect, useState } from 'react';
import { Environment, useEnvironment } from '@react-three/drei';
import { loadExrTexture } from './helpers/loadExrTexture';

import { Texture } from 'three';

type EnvironmentMapProps = {
  map: any,
};

const EnvironmentMap = ({ map }: EnvironmentMapProps) => {
    const [mapTexture, setMapTexture] = useState<Texture | undefined>(undefined);
    const [isLoading, setLoading] = useState(true);  // Add a loading state
    
    useEffect(() => {
        const loadMap = async () => {
            console.log('Loading map:', map.map);
            const texture = await loadExrTexture(map.map);
            setMapTexture(texture);
            console.log('Map loaded:', texture);
        }
        startTransition(() => {
            loadMap();
        });
    }, [map]);

    if (!mapTexture) return null;

    return (
        <Environment
            map={mapTexture}
            background
        />
    );
};

export default EnvironmentMap;
