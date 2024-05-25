import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FaGlobe } from "react-icons/fa";

export const LocaleSwitcher = () => { 
    const [showLanguages, setShowLanguages] = useState(false);
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
        i18n.changeLanguage(e.currentTarget.value);
    }

    const availableLanguages = [
        {
            code: 'en',
            name: '🇬🇧 English'
        },
        {
            code: 'es',
            name: '🇪🇸 Español'
        },
        {
            code: 'fr',
            name: '🇫🇷 Français'
        },
        {
            code: 'de',
            name: '🇩🇪 Deutsch'
        },
        {
            code: 'ru',
            name: '🇷🇺 Русский'
        },
        {
            code: 'zh',
            name: '🇨🇳 中文'
        },
        {
            code: 'ja',
            name: '🇯🇵 日本語'
        },
    ];

    return (
        <div
            onClick={() => setShowLanguages(!showLanguages)}
            onMouseOver={() => setShowLanguages(true)}
            onMouseOut={() => setShowLanguages(false)}
            className='flex justify-center items-center space-x-2 group/locale relative cursor-pointer w-8'
        >
            <FaGlobe className='text-gray-900 dark:text-gray-400 group-hover/locale:text-teal-500 transition-all' />

            <div className={`absolute scale-0 opacity-0 top-2 left-0 w-32 bg-white dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md shadow-md ${showLanguages ? 'scale-100 opacity-100' : ''} origin-top-left transition-all`}>
                {availableLanguages.map(lang => (
                    <button key={lang.code} value={lang.code} onClick={changeLanguage} className='w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all'>
                        {lang.name}
                    </button>
                ))}
            </div>

        </div>
    );
}