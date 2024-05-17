import React, { forwardRef } from 'react';
import EyeFloatersEffect from './EyeFloatersEffect';

type EyeFloatersProps = {
    enabled: boolean;
    textureUrl: string;
    particle_count: number;
    particle_transparency: number;
    particle_size: number;
    particle_color: number;
}

export default forwardRef(function EyeFloaters(props: EyeFloatersProps, ref) {
    const effect = new EyeFloatersEffect(props);
    return <primitive ref={ref} object={effect} />
}
);