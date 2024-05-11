import { CgSpinner } from "react-icons/cg";


export default function Loading() {
    return (
        <div className='loading-indicator hover:cursor-progress'>
            <div className='relative space-y-2'>
                <CgSpinner className='loading-icon animate-spin w-40 h-40 absolute -top-2 -left-4 text-teal-500' />
                <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full p-6' />
                <p>Loading textures...</p>
            </div>
        </div>
    )
}