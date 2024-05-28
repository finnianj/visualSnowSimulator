export const copyToClipboard = (item: string) => {
    navigator.clipboard.writeText(item)
    // Also copy for mobile devices
    if (!navigator.clipboard) {
        copyToClipboardFallback(item)
    }
    
}

const copyToClipboardFallback = (item: string) => {
    const tempInput = document.createElement("input")
    tempInput.value = item
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)
}

export const createConfigQueryParams = (config: any) => {
    // Use the effectsQueryParamMap to map the config object to query params
    const queryParams = new URLSearchParams()
    for (const key in config) {
        if (effectsQueryParamMap[key as keyof typeof effectsQueryParamMap]) {
            queryParams.append(effectsQueryParamMap[key as keyof typeof effectsQueryParamMap], config[key])
        }
    }
    return queryParams.toString()
}

export const getBaseUrl = () => {
    const isDev = process.env.NODE_ENV === 'development'
    return isDev ? 'http://localhost:5173' : process.env.PUBLIC_URL
}

export const effectsQueryParamMap = {
    name: 'name',
    noiseOpacity: 'nO',
    bloomOpacity: 'bO',
    brightness: 'br',
    isFlickering: 'f',
    flickerStrength: 'fS',
    smallEyeFloatersEnabled: 'sef',
    largeEyeFloatersEnabled: 'lef',
    smallEyeFloatersCount: 'sefC',
    largeEyeFloatersCount: 'lefC',
    smallEyeFloatersSize: 'sefS',
    largeEyeFloatersSize: 'lefS',
    smallEyeFloatersTransparency: 'sefT',
    largeEyeFloatersTransparency: 'lefT',
    dizzinessEnabled: 'n',
    vignetteStrength: 'vS',
    showAfterimages: 'sAi'
}

    