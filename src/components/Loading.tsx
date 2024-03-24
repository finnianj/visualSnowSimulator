import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
    return (
        <div className='loading-indicator'>
            <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" />
            <p>Loading...</p>
        </div>
    )
}