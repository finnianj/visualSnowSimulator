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
    