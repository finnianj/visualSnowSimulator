import { useUI } from '@/components/context';
import { useTranslation } from 'react-i18next';

import { DefaultTooltip } from '@/ui/shared/DefaultTooltip'
import { IoMdShare } from "react-icons/io";

export const ShareConfig = () => {
    const { t } = useTranslation(['translation'])
    const { setShowShareConfigModal } = useUI()

    return (
        <>
            <div onClick={() => setShowShareConfigModal(true)} className='relative group/tooltip flex justify-center items-center space-x-2 text-xs text-teal-500 bg-teal-200 w-fit px-4 h-6 rounded-lg mx-auto hover:bg-white hover:text-teal-500 hover:shadow-md transition-all cursor-pointer'>
                <IoMdShare className='scale-150' />
                <DefaultTooltip text={t('changeEffectsPanel.share')} classes='top-6 left-4 origin-top-left z-50' />
            </div>
        </>
    )
}