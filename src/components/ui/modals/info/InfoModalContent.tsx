import { InfoTab, SettingsTab, HelpTab } from './components';

export const InfoModalContent = ({ currentTab }: { currentTab: string }) => {
    return (
        <div className='p-4 pt-0'>
            {currentTab === 'info' && <InfoTab />}
            {currentTab === 'settings' && <SettingsTab />}
            {currentTab === 'help' && <HelpTab />}
        </div>
    )
}