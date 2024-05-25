import { useTranslation, Trans } from 'react-i18next';
import { BiDonateHeart } from "react-icons/bi";
import { projectLinks } from "@/components/links/projectLinks";

export const SupportTab = () => {
    const { t } = useTranslation(["modals", "translation"]);

    const researchInstitutions = [
        {
            name: "King's College London",
            researchers: ["Dr. Francesca Puledda"]
        },
        {
            name: "Guy's and St Thomas' NHS Foundation Trust",
            researchers: ["Dr. Sui Wong"]
        },
        {
            name: "University of Bern",
            researchers: ["Dr. Christoph Schankin", "Dr. Antonia Klein"]
        }
    ]

    const pageName = "latest news";

    return (
        <div className="max-w-4xl mx-auto pt-4 text-left text-slate-500">
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.support.title')}
            </h3>
            
            <p className="mt-2">
                {t('infoModal.tabs.support.description')}
            </p>

            <h3 className="text-md mt-4 font-bold text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.support.latestResearchTitle')}
            </h3>
            <p className="mt-2">
                {t('infoModal.tabs.support.latestResearchDescription')}
            </p>
            
            <ul className="list-disc list-inside mt-1">
                {researchInstitutions.map((institution, index) => (
                    <li key={index}>
                        <span>{institution.name} - <span className='font-bold'>{institution.researchers.join(', ')}</span></span>
                    </li>
                ))}
            </ul>
            <p className="mt-2">
                <Trans
                    i18nKey="modals:infoModal.tabs.support.moreInfo"
                    values = {{ pageName }}
                    components={{ 1: <a href={projectLinks.vsiNewsLink} className="text-blue-500 hover:text-blue-600">{pageName}</a> }}
                />
            </p>
            {/* Donate button */}
            <div className="flex justify-center items-center mt-4">
                <a 
                    href={projectLinks.vsiDonationLink}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center bg-teal-500 dark:bg-teal-600 dark:text-slate-100 text-white rounded-full p-2 px-10 hover:bg-teal-600 dark:hover:bg-teal-700 transition-all "
                >
                    <BiDonateHeart className="w-6 h-6 inline-block mr-1" />
                    {t('buttons.donate', { ns: 'translation' })}
                </a>
            </div>
        </div>
    )
}