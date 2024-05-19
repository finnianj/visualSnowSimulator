import React, { forwardRef } from 'react';
import FlickerEffect from './FlickerEffect';

type FlickerProps = {
    enabled: boolean;
    textureUrl: string;
    intensity: number;
}

export const Flicker = forwardRef(function Flicker(props: FlickerProps, ref) {
    const effect = new FlickerEffect(props);
    return <primitive ref={ref} object={effect} />
}
);