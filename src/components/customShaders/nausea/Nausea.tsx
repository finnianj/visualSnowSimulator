import React, { forwardRef } from 'react';
import NauseaEffect from './NauseaEffect';

type NauseaProps = {
    enabled: boolean;
    frequency: number;
    amplitude: number;
}

export const Nausea = forwardRef(function Nausea(props: NauseaProps, ref) {
    const effect = new NauseaEffect(props);
    return <primitive ref={ref} object={effect} />
});