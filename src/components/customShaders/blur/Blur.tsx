import React, { forwardRef } from 'react';
import BlurEffect from './BlurEffect';

type BlurProps = {
    strength: number;
    enabled: boolean;
}

export const Blur = forwardRef(function Blur(props: BlurProps, ref) {
    const effect = new BlurEffect(props);
    return <primitive ref={ref} object={effect} />
}
);