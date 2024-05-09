import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
    return (
        <div className='loading-indicator hover:cursor-progress'>
            <AiOutlineLoading3Quarters className='loading-icon animate-spin w-8 h-8' />
            <p>Loading textures...</p>
        </div>
    )
}