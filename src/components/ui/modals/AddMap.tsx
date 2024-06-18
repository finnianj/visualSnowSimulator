import React, { useState } from 'react'
import { useTranslation, Trans } from "react-i18next"
import { useUI, useAudio } from '@/components/context'

import { loadHdrTextureWithUploadedFile } from '@/components/helpers/loadHdrTexture'
import { Texture } from 'three'
import { MapType } from '@/components/types'
import { BlendFunction } from 'postprocessing';
import { Spinner } from '../shared/Spinner'

import { MdClose } from 'react-icons/md'

type AddMapProps = {
    maps: MapType[],
    setMaps: (maps: MapType[]) => void,
    setModalOpen: (open: boolean) => void,
    setCurrentMap: (map: MapType) => void,
}

export const AddMap = ({ maps, setMaps, setCurrentMap, setModalOpen }: AddMapProps) => {
    const { t } = useTranslation(['modals']);
    const { darkMode } = useUI()
    const { setAmbientAudioSrc } = useAudio();
    const [loading, setLoading] = useState(false)
    
    const createNewMap = (e : React.ChangeEvent<HTMLInputElement>) => {
        // Add a new map to the simulator
        const newHdriMap = e.target.files?.[0];
        if (!newHdriMap) return;
        setLoading(true);

        const newMap: MapType = {
            name: 'Custom Map',
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
                setCurrentMap(newMap);
                setAmbientAudioSrc('');
                setModalOpen(false);
            })
        }
        loadMap(newHdriMap);
    }

    const handleClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };


    return (
        <div className={`flex flex-col items-center rounded-lg shadow-mg text-white min-w-24 max-w-3xl p-4 ${darkMode ? 'bg-gray-900 dark' : 'bg-gray-100'}`}>
            <div className='absolute top-2 right-2'>
                <button onClick={() => setModalOpen(false)} className="p-2 hover:opacity-75 transition-all scale-150">
                    <MdClose className="text-gray-900 dark:text-gray-400" />
                </button>
            </div>
            
            <div className='flex flex-col items-start text-slate-600 dark:text-slate-400 space-y-4 text-left'>
                <p className='text-lg w-full font-bold text-center'>
                    {/* {t('shareConfigModal.title', { ns: 'modals' })} */}
                    Add a Custom Map
                </p>
                <p>
                    {/* {t('shareConfigModal.description', { ns: 'modals' })} */}
                    You can upload any HDRI map you like using the instructions below. For the sake of performance, the default maps in this simulator are all 2K, but you can upload one with an even higher reslution. 
                </p>
                
                {/* Walkthrough */}
                <div className='flex flex-col space-y-2 justify-center items-start'>
                    <p className='text-teal-500 font-semibold'>Instructions:</p>
                    <p className='text-sm'>
                        1. Choose a map from this library.
                    </p>
                    {/* <Trans
                        i18nKey="modals:infoModal.tabs.info.learnMoreDescription"
                        values = {{ websiteName }}
                        components={{ 1: <a href={projectLinks.vsiHomepage} className="text-blue-500 hover:text-blue-600">{websiteName}</a> }}
                    />  */}
                    <p className='text-sm'>
                        2. Select a resolution (eg. 4K) and click download.
                    </p>
                    <p className='text-sm'>
                        3. Upload the map using the input field below.
                    </p>
                </div>  

                {/* Input field for 4k hdri image */}
                {loading ? (
                    <div className='w-full flex justify-center text-teal-500'>
                        <Spinner />
                    </div>
                ): (
                    <div className='flex flex-col space-y-2 w-full justify-center items-center'>
                        <input 
                            id='fileInput'
                            onChange={(e) => createNewMap(e)}
                            type='file' 
                            // accept hdri
                            accept='.hdr'
                            className='hidden'
                        />
                        <button 
                            onClick={handleClick}
                            className='px-4 py-2 bg-teal-500 text-white rounded-lg cursor-pointer'
                        >
                            Choose File
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}