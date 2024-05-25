import { useUI } from '@/components/context';
import { LocaleSwitcher } from '@/components/i18n/LocaleSwitcher';

import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

type ModalIconsProps = {
    setShowInfo: ( show: boolean ) => void;
}

export const ModalIcons = ({ setShowInfo } : ModalIconsProps ) => {
    const { darkMode, setDarkMode, locale, setLocale } = useUI();

    return (
        <>
            {/* Dark mode and exit modal icons */}
            <div className='absolute top-2 left-2 flex space-x-2 items-center justify-center'>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full">
                    {darkMode ? <FaSun className='text-yellow-600 hover:opacity-75 transition-all' /> : <FaMoon className="text-gray-900" />}
                </button>
                <LocaleSwitcher />
            </div>
            <div className='absolute top-2 right-2'>
                <button onClick={() => setShowInfo(false)} className="p-2 hover:opacity-75 transition-all scale-150">
                    <MdClose className="text-gray-900 dark:text-gray-400" />
                </button>
            </div>
        </>
    )
}