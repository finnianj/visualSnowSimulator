import { FaSun, FaMoon } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

type ModalIconsProps = {
    darkMode: boolean;
    setDarkMode: ( dark: boolean ) => void;
    setShowInfo: ( show: boolean ) => void;
}

export const ModalIcons = ({ darkMode, setDarkMode, setShowInfo } : ModalIconsProps ) => {

    return (
        <>
            {/* Dark mode and exit modal icons */}
            <div className='absolute top-2 left-2'>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                    {darkMode ? <FaSun className='text-yellow-600 hover:opacity-75 transition-all' /> : <FaMoon className="text-gray-900" />}
                </button>
            </div>
            <div className='absolute top-2 right-2'>
                <button onClick={() => setShowInfo(false)} className="p-2 hover:opacity-75 transition-all scale-150">
                    <MdClose className="text-gray-900 dark:text-gray-400" />
                </button>
            </div>
        </>
    )
}