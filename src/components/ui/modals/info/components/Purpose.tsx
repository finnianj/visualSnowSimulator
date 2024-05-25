import { useState } from "react";

import { useTranslation, Trans } from "react-i18next";

import { projectLinks } from "@/components/links/projectLinks"
import { copyToClipboard } from "@/components/helpers/utils";
import { FaCode, FaCheckCircle, FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const HelpTab = () => {
    const { t } = useTranslation(["modals", "translation"]);
    const [copiedEmail, setCopiedEmail] = useState(false)

    const handleCopyEmail = () => {
        copyToClipboard(projectLinks.contactEmail)
        setCopiedEmail(true)
        setTimeout(() => {
            setCopiedEmail(false)
        }, 3000)
    }

    const supportLinkText = t('infoModal.tabs.purpose.supportLinkText')

    return (
        <div className="max-w-4xl mx-auto pt-4 text-left text-slate-500">
            <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full mx-auto my-2 shadow-md' />
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.purpose.title')}
            </h3>

            <p className="mt-2">
                {t('infoModal.tabs.purpose.description')}
            </p>

            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.purpose.disclaimerTitle')}
            </h4>
            <p className="mt-2">
                {t('infoModal.tabs.purpose.disclaimer')}
            </p>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.purpose.supportTitle')}
            </h4>
            <div className="flex mt-2 flex-col">
                <p>
                    <Trans
                        i18nKey="modals:infoModal.tabs.purpose.supportDescription"
                        values={{ supportLinkText }}
                        components={{ 
                            1: 
                            <a href={projectLinks.marathonDonationLink || projectLinks.vsiDonationLink} target="_blank" className="text-blue-500 hover:text-blue-600">
                                {supportLinkText}
                            </a>
                        }}
                    />
                </p>
                <div className="flex justify-center items-center w-full">
                    <div className="flex mt-4 space-x-8">
                        <a href={projectLinks.projectGithub} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                            <FaCode className="w-6 h-6 mr-1" />
                            {t('buttons.code', { ns: 'translation' })}
                        </a>
                        {copiedEmail ? (
                            <div className="flex items-center text-green-500 ml-4">
                                <FaCheckCircle className="w-6 h-6 mr-1" />
                                {t('infoModal.tabs.purpose.emailCopied')}
                            </div>
                        ) : (
                            <div onClick={handleCopyEmail} className="flex items-center text-blue-500 hover:text-blue-600 ml-4 cursor-pointer">
                                <MdEmail className="w-6 h-6 mr-1" />
                                {t('buttons.contact', { ns: 'translation' })}
                            </div>
                        )}
                        <a href={projectLinks.discordInvite} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600 ml-4">
                            <FaDiscord className="w-6 h-6 mr-1" />
                            {t('buttons.discord', { ns: 'translation' })}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}