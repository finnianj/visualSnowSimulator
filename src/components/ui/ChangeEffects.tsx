type ChangeEffectsProps = {
    noiseOpacity: number,
    setNoiseOpacity: (value: number) => void,
    bloomOpacity: number,
    setBloomOpacity: (value: number) => void,
    brightness: number,
    setBrightness: (value: number) => void,
    contrast: number,
    setContrast: (value: number) => void
}

export const ChangeEffects = ({
    noiseOpacity,
    setNoiseOpacity, 
    bloomOpacity,
    setBloomOpacity,
    brightness,
    setBrightness,
    contrast,
    setContrast
}: ChangeEffectsProps) => {

    return (
        <div className="absolute z-20 top-4 left-4 w-fit">
            <div className='bg-teal-400 flex flex-col justify-center items-start shadow-lg rounded-lg p-4 text-sm space-y-2'>
                 {/* Snow opacity */}
                <div className='text-white'>Snow</div>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={noiseOpacity} 
                    onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600' 
                />
                
                {/* Bloom opacity */}
                <div className='text-white'>Bloom</div>
                <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.01" 
                    value={bloomOpacity} 
                    onChange={(e) => setBloomOpacity(parseFloat(e.target.value))} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600' 
                />

                {/* Brightness */}
                <div className='text-white'>Brightness</div>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={brightness} 
                    onChange={(e) => setBrightness(parseFloat(e.target.value))} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600'
                />

                {/* Contrast */}
                <div className='text-white'>Contrast</div>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={contrast} 
                    onChange={(e) => setContrast(parseFloat(e.target.value))} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600'
                />

            </div>
        </div>    )
}