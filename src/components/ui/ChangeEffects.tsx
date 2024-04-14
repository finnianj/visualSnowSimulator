type ChangeEffectsProps = {
    noiseOpacity: number,
    setNoiseOpacity: (value: number) => void,
}

export const ChangeEffects = ({setNoiseOpacity, noiseOpacity}: ChangeEffectsProps) => {

    return (
        <div className="absolute z-20 top-4 left-4 w-fit">
            <div className='bg-teal-400 flex flex-col justify-center items-start shadow-lg rounded-lg p-4 text-sm space-y-2'>
                <div className='transition-all text-white'>Snow Opacity</div>
                 
                 {/* Slider */}
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={noiseOpacity} 
                    onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600' 
                />

            </div>
        </div>    )
}