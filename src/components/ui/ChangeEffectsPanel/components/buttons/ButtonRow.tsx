import { ShareConfig } from "./ShareConfig"
import { ResetEffects } from "./ResetEffects"

export const ButtonRow = () => {

    return (
        <div className="flex justify-between space-x-2">  
            <ResetEffects />
            <ShareConfig />
        </div>

    )
}