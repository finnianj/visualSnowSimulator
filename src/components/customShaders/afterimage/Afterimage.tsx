import AfterimageEffect from './AfterimageEffect'

export const Afterimage = ({ enabled, damp } : { enabled: boolean, damp?: number }) => {
    const effect = new AfterimageEffect({ enabled, damp });
    return <primitive object={effect} />
};