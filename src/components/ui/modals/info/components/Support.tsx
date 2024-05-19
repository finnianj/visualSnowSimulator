import { BiDonateHeart } from "react-icons/bi";
import { projectLinks } from "../../../../links/projectLinks";

export const SettingsTab = () => {
    return (
        <div className="max-w-4xl mx-auto pt-4 text-left text-slate-500">
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">Why Your Donation Matters</h3>
            
            <p className="mt-2">
                Research into Visual Snow Syndrome is crucial as it remains a poorly understood condition. Funding is vital for advancing our understanding of its causes, developing effective treatments, and improving quality of life for those affected. Without adequate funding, progress in these areas remains slow.
            </p>

            <h3 className="text-md mt-4 font-bold text-slate-600 dark:text-slate-400">Latest Research</h3>
            <p className="mt-2">
                Key areas of research include identifying biomarkers, understanding the pathophysiology of VSS, and exploring innovative treatments such as MBCT-vision (Mindfulness-Based Cognitive Therapy for vision) and neuromodulation techniques.
            </p>
            <p className="mt-2">
                These studies are conducted at leading research institutions around the world:
            </p>
            <ul className="list-disc list-inside mt-1">
                <li><strong>King's College London</strong> - Dr. Francesca Puledda</li>
                <li><strong>Guy's and St Thomas' NHS Foundation Trust</strong> - Dr. Sui Wong</li>
                <li><strong>University of Bern</strong> - Dr. Christoph Schankin and Dr. Antonia Klein</li>
            </ul>
            <p className="mt-2">
                For more detailed information about each project and the latest updates, visit the <a href="https://www.visualsnowinitiative.org/news/" className="text-blue-500 hover:text-blue-600">Visual Snow Initiative News</a> section on the VSI website.
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
                    Donate
                </a>
            </div>
        </div>
    )
}