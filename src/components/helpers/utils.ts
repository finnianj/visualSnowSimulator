import { projectLinks } from "../links/projectLinks"

export const copyEmailToClipboard = () => {
    const email = projectLinks.contactEmail
    navigator.clipboard.writeText(email)
    // Also copy for mobile devices
    if (!navigator.clipboard) {
        copyEmailToClipboardFallback(email)
    }
    
}

const copyEmailToClipboardFallback = (email: string) => {
    const tempInput = document.createElement("input")
    tempInput.value = email
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)
}

export const createConfigQueryParams = (config: any) => {
    return Object.entries(config)
        .filter(([key, value]) => value != null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`)
        .join('&');
}

export const getBaseUrl = () => {
    const isDev = process.env.NODE_ENV === 'development'
    return isDev ? 'http://localhost:5173' : process.env.PUBLIC_URL
}
    