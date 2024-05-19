import { useEffects } from "../../../../context"

import { DefaultTooltip } from "../../../shared/DefaultTooltip"
import { FaPause, FaPlay } from "react-icons/fa";

export const PlayPause = () => {
    const { isSimulatorOn, setIsSimulatorOn } = useEffects();

    const handleTogglePower = () => {
        setIsSimulatorOn(!isSimulatorOn);
    }
    
    return (
        <button
            className={`relative group/tooltip flex justify-center items-center space-x-2 border w-fit p-2 rounded-full transition-all cursor-pointer`}
            onClick={handleTogglePower}
        >
            
            {isSimulatorOn ? <FaPause className='text-white' /> : <FaPlay className='text-white' />}
            <DefaultTooltip text={`${isSimulatorOn ? 'Pause all effects' : 'Play all effects'}`} classes='top-6 left-4 origin-top-left' />
        </button>
    )
}