type CheckBoxInputProps = {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBoxInput = ({ label, checked, onChange }: CheckBoxInputProps) => {
    return (
        <div className='flex items-center justify-between space-x-2 text-xxs'>
            <label htmlFor={label} className='cursor-pointer'>{label}</label>
            <input 
                type='checkbox'
                id={label}
                onChange={onChange}
                checked={checked}
                className='accent-teal-600 cursor-pointer'
            />
        </div>
    )
}