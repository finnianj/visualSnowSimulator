import React, { useState } from "react";
import { projectLinks } from "../../../../links/projectLinks"
import { copyToClipboard } from "../../../../helpers/utils";
import { FaGithub, FaCode, FaCheckCircle, FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const HelpTab = () => {
    const [copiedEmail, setCopiedEmail] = useState(false)

    const handleCopyEmail = () => {
        copyToClipboard(projectLinks.contactEmail)
        setCopiedEmail(true)
        setTimeout(() => {
            setCopiedEmail(false)
        }, 3000)
    }
    return (
        <div className="max-w-4xl mx-auto pt-4 text-left text-slate-500">
            <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full mx-auto my-2 shadow-md' />
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">Why This Simulator Was Built</h3>

            <p className="mt-2">
                The Visual Snow Simulator is an open source tool developed with the aim of raising awareness. Hopefully, it allows non-sufferers to experience a visual approximation of the condition, and those who have Visual Snow to share their reality with those close to them. If one person can feel less isolated through this tool, then it has achieved its purpose.
            </p>
            

            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">Limitations and Development</h4>
            <p className="mt-2">
                The simulator is a work in progress and may not accurately represent the visual disturbances experienced by all individuals with Visual Snow Syndrome. Some common symptoms of Visual Snow are very difficult to implement and have not been included. If you have any feedback or suggestions, or if you happen to be a talented GLSL developer, please get in touch.
            </p>
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">Support my Fundraiser</h4>
            <div className="flex mt-2 flex-col">
                <p>
                    The simulator was developed by Finn, a Drummer and Web Developer from the UK, living in Berlin, Germany. Finn is running the 2024 Berlin Marathon for the Visual Snow Initiative to raise awareness and funds for research into Visual Snow Syndrome. You can donate directly to his fundraiser <a href={projectLinks.marathonDonationLink || projectLinks.vsiDonationLink} target="_blank" className="text-blue-500 hover:text-blue-600">here</a>.
                </p>
                <div className="flex justify-center items-center w-full">
                    {/* Links to github and project code */}
                    <div className="flex mt-4 space-x-8">
                        <a href={projectLinks.projectGithub} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                            <FaCode className="w-6 h-6 mr-1" />
                            Project Code
                        </a>
                        {/* Contact email */}
                        {copiedEmail ? (
                            <div className="flex items-center text-green-500 ml-4">
                                <FaCheckCircle className="w-6 h-6 mr-1" />
                                Email Copied!
                            </div>
                        ) : (
                            <div onClick={handleCopyEmail} className="flex items-center text-blue-500 hover:text-blue-600 ml-4 cursor-pointer">
                                <MdEmail className="w-6 h-6 mr-1" />
                                Contact
                            </div>
                        )}
                        {/* Discord */}
                        <a href={projectLinks.discordInvite} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600 ml-4">
                            <FaDiscord className="w-6 h-6 mr-1" />
                            Discord
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}