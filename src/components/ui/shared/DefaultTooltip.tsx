export const DefaultTooltip = ({ text, classes }: { text: string, classes?: string }) => {
    // Use the classes prop to determine the positioning of the tooltip, e.g 'top-4 left-4 origin-top-left'
    const isMobile = window.innerWidth < 768;

    return (
        <div className={`absolute ${classes} z-50 bg-teal-600 text-white text-xs shadow-md p-2 w-max rounded-md opacity-0 scale-0 ${isMobile ? '' : 'group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100'} transition-all group-hover/tooltip:delay-500 `}>
            <p>{text}</p>
        </div>
    )
}