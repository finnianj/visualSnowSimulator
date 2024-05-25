import { useTranslation } from 'react-i18next';
import { useEffects, useUI } from '@/components/context';

import { RangeInput, CheckBoxInput } from '.';

export const FlickerInputs = () => {
    const { t } = useTranslation(['translation']);
    const { isFlickering, setIsFlickering, flickerStrength, setFlickerStrength } = useEffects();
    const { setShowFlickerWarning, hasSeenFlickerWarning } = useUI();

    const handleCheckboxChange = () => {
        if (!isFlickering) {
            if (hasSeenFlickerWarning) {
                setIsFlickering(true);
            } else {
                setShowFlickerWarning(true);
            }
        } else {
            setIsFlickering(!isFlickering);
        }
    }

    return (
        <div>
            <CheckBoxInput
                label={t('changeEffectsPanel.flickering')}
                checked={isFlickering}
                onChange={handleCheckboxChange}
            />
            <RangeInput
                name={t('changeEffectsPanel.flickerStrength')}
                min={0}
                max={0.3}
                step={0.01}
                value={flickerStrength}
                onChange={(e) => setFlickerStrength(parseFloat(e.target.value))}
                indent={true}
            />            
        </div>
    )
}