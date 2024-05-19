import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className='loading-indicator hover:cursor-progress'>
            <div className='relative flex flex-col justify-center items-center space-y-4'>
                <CgSpinner className='loading-icon animate-spin w-80 h-80 absolute -top-4 -left-8 text-teal-500' />
                <img src='./images/logo.png' alt='logo' className='w-64 h-64 rounded-full p-6' />
                <p className="text-xl">Loading textures...</p>
            </div>
        </div>
    )
}