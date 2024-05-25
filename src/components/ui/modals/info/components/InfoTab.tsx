import { projectLinks } from '@/components/links/projectLinks';
import { useTranslation, Trans } from 'react-i18next';

export const InfoTab = () => {
    const { t } = useTranslation('modals');

    const noOfSymptoms = 22;
    const websiteName = 'Visual Snow Initiative'

    return (
        <div className="max-w-4xl mx-auto pt-4 text-left text-slate-500">
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.info.title')}
            </h3>
            <p className="mt-2">
                {t('infoModal.tabs.info.description')}
            </p>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.info.symptomsTitle')}
            </h4>
            <ul className="list-disc list-inside mt-1 overflow-y-scroll h-40">
                {[...Array(noOfSymptoms).keys()].map((index) => (
                    <li key={index}>
                        {t(`infoModal.tabs.info.symptoms.${index}`)}
                    </li>
                ))}
            </ul>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.info.causesTitle')}
            </h4>
            <p className="mt-2">
                {t('infoModal.tabs.info.causesDescription')}
            </p>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.info.treatmentTitle')}
            </h4>
            <p className="mt-2">
                {t('infoModal.tabs.info.treatmentDescription')}
            </p>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">
                {t('infoModal.tabs.info.learnMoreTitle')}
            </h4>
            <p className="mt-2">
                <Trans
                    i18nKey="modals:infoModal.tabs.info.learnMoreDescription"
                    values = {{ websiteName }}
                    components={{ 1: <a href={projectLinks.vsiHomepage} className="text-blue-500 hover:text-blue-600">{websiteName}</a> }}
                /> 
            </p>
        </div>
    );
}

