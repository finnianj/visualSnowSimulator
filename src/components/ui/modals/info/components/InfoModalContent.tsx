import { InfoTab, SupportTab, HelpTab } from '.';

export const InfoModalContent = ({ currentTab }: { currentTab: string }) => {
    return (
        <div className='p-4 pt-0'>
            {currentTab === 'info' && <InfoTab />}
            {currentTab === 'settings' && <SupportTab />}
            {currentTab === 'help' && <HelpTab />}
        </div>
    )
}