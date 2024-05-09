type RangeInputProps = {
    name: string,
    min: number,
    max: number,
    step: number,
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RangeInput = ({name, min, max, step, value, onChange}: RangeInputProps) => {
    return (
        <>
            <div className='text-white'>{name}</div>
                <input 
                    type="range" 
                    min={min}
                    max={max}
                    step={step}
                    value={value} 
                    onChange={onChange} 
                    className='w-fit hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600' 
            />
        </>
    )
}