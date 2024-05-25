import { useEffects } from "@/components/context"
import { useTranslation } from "react-i18next"

import { DefaultTooltip } from "@/ui/shared/DefaultTooltip"
import { FaPause, FaPlay } from "react-icons/fa";

export const PlayPause = () => {
    const { t } = useTranslation(['translation'])
    const { userHasPausedEffects, setUserHasPausedEffects } = useEffects();

    const handleTogglePlay = () => {
        setUserHasPausedEffects(!userHasPausedEffects)
    }
    
    return (
        <button
            className={`relative group/tooltip flex justify-center items-center space-x-2 border w-fit p-2 rounded-full transition-all cursor-pointer`}
            onClick={handleTogglePlay}
        >
            
            { userHasPausedEffects ? <FaPlay className='text-white' /> : <FaPause className='text-white' /> }
            <DefaultTooltip text={`${userHasPausedEffects ? t('changeEffectsPanel.play') : t('changeEffectsPanel.pause')}`} classes='top-6 left-4 origin-top-left' />
        </button>
    )
}