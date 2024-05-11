import { projectLinks } from "../links/projectLinks"

export const copyEmailToClipboard = () => {
    const email = projectLinks.contactEmail
    navigator.clipboard.writeText(email)
}