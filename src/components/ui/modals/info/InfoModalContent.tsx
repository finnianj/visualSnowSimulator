import { InfoTab, SettingsTab, HelpTab } from './components';

export const InfoModalContent = ({ currentTab }: { currentTab: string }) => {
    return (
        <div>
            {currentTab === 'info' && <InfoTab />}
            {currentTab === 'settings' && <SettingsTab />}
            {currentTab === 'help' && <HelpTab />}
        </div>
    )
}