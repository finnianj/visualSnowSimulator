type TabHeadersProps = {
    currentTab: string,
    setCurrentTab: (value: string) => void,
}

export const TabHeaders = ({ currentTab, setCurrentTab } : TabHeadersProps) => {

    const getTabClasses = (tab: string) => {
        return `text-xl ${currentTab === tab ? 'font-bold text-teal-500 border-b-4 border-teal-500 dark:text-teal-600 dark:border-teal-600': 'text-slate-500 hover:opacity-75 transition-all'}`
    }

    return (
        <div className="flex justify-center items-center space-x-16">
            <button onClick={() => setCurrentTab('info')} className={getTabClasses('info')}> Info</button>
            <button onClick={() => setCurrentTab('settings')} className={getTabClasses('settings')}>Support</button>
            <button onClick={() => setCurrentTab('help')} className={getTabClasses('help')}>This Tool</button>
        </div>
    )
}
