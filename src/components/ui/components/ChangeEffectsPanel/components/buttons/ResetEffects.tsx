import { useEffects, useAudio } from '@/components/context'
import { useTranslation } from 'react-i18next';

import { DefaultTooltip } from '@/ui/shared/DefaultTooltip';
import { RxReset } from "react-icons/rx";

export const ResetEffects = () => {
    const { t } = useTranslation(['translation'])
    const { resetAllEffectsToDefault } = useEffects()
    const { resetAllAudio } = useAudio()

    const handleReset = () => {
        resetAllEffectsToDefault()
        resetAllAudio()
    }

    return (
        <button
            className='relative group/tooltip flex justify-center items-center space-x-2  text-teal-500 bg-teal-200 w-fit px-4 h-6 rounded-lg hover:bg-white hover:text-teal-500 hover:shadow-md transition-all cursor-pointer'
            onClick={handleReset}
        >
            <RxReset className='scale-150 cursor-pointer' />
            <DefaultTooltip text={t('changeEffectsPanel.resetEffects')} classes='top-6 left-4 origin-top-left' />
        </button>
    )
}