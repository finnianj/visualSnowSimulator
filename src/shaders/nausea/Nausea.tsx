import React, { forwardRef } from 'react';
import NauseaEffect from './NauseaEffect';

type NauseaProps = {
    frequency: number;
    amplitude: number;
}

export default forwardRef(function Nausea(props: NauseaProps, ref) {
    const effect = new NauseaEffect(props);
    return <primitive ref={ref} object={effect} />
});