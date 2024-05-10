import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
    return (
        <div className='loading-indicator hover:cursor-progress'>
            <div className='relative space-y-2'>
                <AiOutlineLoading3Quarters className='loading-icon animate-spin w-32 h-32 absolute top-2 left-0 text-teal-500' />
                <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full p-2' />
                <p>Loading textures...</p>
            </div>
        </div>
    )
}