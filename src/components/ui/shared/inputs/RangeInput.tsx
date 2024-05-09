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
        <div className="flex justify-between items-center w-full space-x-2">
            <div className='text-white text-xxs w-1/3'>{name}</div>
            <input 
                type="range" 
                min={min}
                max={max}
                step={step}
                value={value} 
                onChange={onChange} 
                className='w-full hover:cursor-grab active:cursor-grabbing transition-all text-white accent-teal-600' 
            />
        </div>
    )
}