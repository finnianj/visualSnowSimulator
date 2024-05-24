import React, { forwardRef } from 'react';
import AfterimagesEffect from './AfterimagesEffect';

type AfterimagesProps = {
    enabled: boolean;
}

export const Afterimages = forwardRef(function Afterimages(props: AfterimagesProps, ref) {
    const effect = new AfterimagesEffect(props);
    return <primitive ref={ref} object={effect} />
});