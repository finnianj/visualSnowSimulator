import { ShareConfig } from "./ShareConfig"
import { ResetEffects } from "./ResetEffects"
import { PlayPause } from "./PlayPause"

export const ButtonRow = () => {

    return (
        <div className="flex justify-between items-center space-x-2 ">  
            <ResetEffects />
            <PlayPause />
            <ShareConfig />
        </div>

    )
}