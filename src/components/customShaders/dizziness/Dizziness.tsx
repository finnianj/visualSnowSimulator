import React, { forwardRef } from 'react';
import DizzinessEffect from './DizzinessEffect';

type DizzinessProps = {
    enabled: boolean;
    frequency: number;
    amplitude: number;
}

export const Dizziness = forwardRef(function Dizziness(props: DizzinessProps, ref) {
    const effect = new DizzinessEffect(props);
    return <primitive ref={ref} object={effect} />
});