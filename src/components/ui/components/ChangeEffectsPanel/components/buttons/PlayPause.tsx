import { useEffects } from "../../../../../context"

import { DefaultTooltip } from "../../../../shared/DefaultTooltip"
import { FaPause, FaPlay } from "react-icons/fa";

export const PlayPause = () => {
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
            <DefaultTooltip text={`${userHasPausedEffects ? 'Play effects' : 'Pause effects'}`} classes='top-6 left-4 origin-top-left' />
        </button>
    )
}