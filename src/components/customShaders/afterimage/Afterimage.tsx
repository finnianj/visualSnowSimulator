import React from 'react';
import AfterimageEffect from './AfterimageEffect';

export const Afterimage = ({ damp } : { damp?: number }) => {
    const effect = new AfterimageEffect({ damp });
    return <primitive object={effect} />
};