import { useTranslation } from "react-i18next";

import { projectLinks } from "@/components/links/projectLinks";
import { BiDonateHeart } from "react-icons/bi";
import { DefaultTooltip } from "../shared/DefaultTooltip";

export const Donate = () => {
    const { t } = useTranslation(['translation'])

    const handleClick = () => {
        window.open(projectLinks.marathonDonationLink || projectLinks.vsiDonationLink, '_blank')
    }

    return (
        <div className="relative group/tooltip">
            <div 
                onClick={handleClick}
                className='fixed group bottom-0 right-0 z-10 bg-teal-500 text-white rounded-tl-full p-4 shadow-md hover:cursor-pointer  hover:scale-110 transition-all'
            >
                <BiDonateHeart className='w-8 h-8 text-teal-100 translate-x-2 translate-y-2  group-hover:text-white transition-all' />
            </div>

            <DefaultTooltip text={t('buttons.donate')} classes={`!fixed !right-16 !bottom-10 origin-right`} />
        </div>
    )
}