import { BiDonateHeart } from "react-icons/bi";

export const Donate = () => {
    const url = 'https://visualsnowinitiative.networkforgood.com/';

    const handleClick = () => {
        // Open donation page in new tab

    }

    return (
        <div 
            onClick={handleClick} 
            className='fixed group bottom-0 right-0 z-20 bg-teal-500 text-white rounded-tl-full p-4 shadow-md hover:cursor-pointer  hover:scale-110 transition-all'
        >
            <BiDonateHeart className='w-8 h-8 text-teal-100 translate-x-2 translate-y-2  group-hover:text-white transition-all' />
        </div>
    )
}