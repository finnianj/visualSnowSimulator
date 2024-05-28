import React from 'react';
import { useTranslation } from 'react-i18next';

import { useEffects } from '@/components/context';
import { CheckBoxInput } from './CheckboxInput';

import { IoIosWarning } from 'react-icons/io';

export const AfterimagesInputs = () => {
    const { showAfterimages, setShowAfterimages } = useEffects();
    const { t } = useTranslation(['translation']);

    return (
        <div className='overflow-hidden h-6 hover:h-10 transition-all'>
            <div className='flex w-full justify-start items-center space-x-2'>
                <IoIosWarning className='text-teal-600 text-2xl group-hover:text-red-700 transition-all' />
                <CheckBoxInput
                    label={t('changeEffectsPanel.afterimages.title')}
                    checked={showAfterimages}
                    onChange={() => setShowAfterimages(!showAfterimages)}
                />
            </div>
            <em className='text-xxs'>{t('changeEffectsPanel.afterimages.warning')}</em>
        </div>
    )
}