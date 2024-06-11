import SnowEffect from './SnowEffect'

export const Snow = ({ enabled, strength } : { enabled: boolean, strength?: number }) => {
    const effect = new SnowEffect({ enabled, strength });
    return <primitive object={effect} />
};