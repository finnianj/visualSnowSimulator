import React, { forwardRef } from 'react';
import EyeFloatersEffect from './EyeFloatersEffect';

type EyeFloatersProps = {
    textureUrl: string;
}

export default forwardRef(function EyeFloaters(props: EyeFloatersProps, ref) {
    const effect = new EyeFloatersEffect(props);
    return <primitive ref={ref} object={effect} />
}
);