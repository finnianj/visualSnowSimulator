export const getChildPositioning = (side: string) => {

    switch(side) {
        case 'top-right':
            return 'origin-top-right top-12 left-0'
        case 'top-left':
            return 'origin-top-left top-12 right-0'
        case 'bottom-right':
            return 'origin-bottom-right bottom-12 left-0'
        case 'bottom-left':
            return 'origin-bottom-left bottom-12 right-0'
        default:
            return null
    }
}

export const getContainerPositioning = (side: string) => {
    switch(side) {
        case 'top-right':
            return 'right-4 top-4'
        case 'top-left':
            return 'left-4 top-4'
        case 'bottom-right':
            return 'right-4 bottom-4'
        case 'bottom-left':
            return 'left-4 bottom-4'
        default:
            return null
    }
}