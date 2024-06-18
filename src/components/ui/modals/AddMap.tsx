import React from 'react'
import { useTranslation } from "react-i18next"
import { useUI } from '@/components/context'

import { loadHdrTextureWithUploadedFile } from '@/components/helpers/loadHdrTexture'
import { Texture } from 'three'
import { MapType } from '@/components/types'
import { BlendFunction } from 'postprocessing';

type AddMapProps = {
    maps: MapType[],
    setMaps: (maps: MapType[]) => void,
}

export const AddMap = ({ maps, setMaps }: AddMapProps) => {
    const { t } = useTranslation(['modals']);
    const { darkMode } = useUI()

    const createNewMap = (e : React.ChangeEvent<HTMLInputElement>) => {
        // Add a new map to the simulator
        const newHdriMap = e.target.files?.[0];
        if (!newHdriMap) return;

        const newMap: MapType = {
            name: 'New Map',
            id: '',
            audio: '',
            texture: undefined,
            blendFunction: BlendFunction.SOFT_LIGHT,
            afterimageStrength: 0.6,
        }

        const loadMap = async (file: File) => {
            await loadHdrTextureWithUploadedFile(file).then((texture) => {
                newMap.texture = texture;
                setMaps([...maps, newMap]);
            })
        }
        loadMap(newHdriMap);
    }


    return (
        <div className={`flex flex-col items-center rounded-lg shadow-mg text-white min-w-24 max-w-3xl p-4 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'}`}>
            <div className='flex flex-col items-center text-slate-600 dark:text-slate-400 space-y-4 text-left'>
                <p className='text-lg font-bold text-center'>
                    {/* {t('shareConfigModal.title', { ns: 'modals' })} */}
                    Add Map
                </p>
                <p>
                    {/* {t('shareConfigModal.description', { ns: 'modals' })} */}
                    Add a map to the simulator.
                </p>
                
                {/* Walkthrough */}
                <div className='flex flex-col space-y-2 justify-center items-start'>
                    <p className='text-teal-500 font-semibold'>Instructions:</p>
                    <p className='text-sm'>
                        1. Click on the Add Map button.
                    </p>
                    <p className='text-sm'>
                        2. Select a map from the dropdown.
                    </p>
                    <p className='text-sm'>
                        3. Click on the Add Map button.
                    </p>
                    <p className='text-sm'>
                        4. The map will be added to the simulator.
                    </p>
                </div>  

                {/* Input field for 4k hdri image */}
                <div className='flex flex-col space-y-2 justify-center items-start'>
                    <p className='text-teal-500 font-semibold'>HDRI Image:</p>
                    <input 
                        onChange={(e) => createNewMap(e)}
                        type='file' 
                        // accept hdri
                        accept='.hdr'
                        className='w-full p-2 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-400 rounded-lg'
                    />
                </div>
            </div>
        </div>
    )
}