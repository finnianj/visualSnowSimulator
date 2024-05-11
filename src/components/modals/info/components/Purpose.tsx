import React, { useState } from "react";
import { projectLinks } from "../../../links/projectLinks"
import { copyEmailToClipboard } from "../../../helpers/utils";
import { FaGithub, FaCode, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const HelpTab = () => {
    const [copiedEmail, setCopiedEmail] = useState(false)

    const handleCopyEmail = () => {
        setCopiedEmail(true)
        copyEmailToClipboard()
        setTimeout(() => {
            setCopiedEmail(false)
        }, 3000)
    }
    return (
        <div className="max-w-4xl mx-auto p-4 text-left text-slate-500">
            <img src='./images/logoNoText.png' alt='logo' className='w-32 h-32 rounded-full mx-auto my-2 shadow-md' />
            <h3 className="text-lg text-center font-bold text-slate-600 dark:text-slate-400">Why This Simulator Was Built</h3>

            <p className="mt-2">
                Visual Snow is a condition that is both isolating and misunderstood, largely because it is an internal experience and affects a relatively small number of people globally. The Visual Snow Simulator was developed to bridge this gap in understanding by allowing non-sufferers to experience a visual approximation of the condition, and by allowing people who experience Visual Snow to share their reality. This tool serves not only to spread awareness but also to foster empathy and support from the broader community, helping those affected feel less isolated.
            </p>
            
            <h4 className="text-md font-semibold mt-4 text-slate-600 dark:text-slate-400">About the Developer</h4>
            <div className="flex mt-2">
                {/* <img src="./finn.png" alt="Developer" className="w-20 h-20 mr-4 rounded-full" /> */}
                <div>
                <p>
                    The simulator was developed by Finn, a Drummer and Web Developer from the UK, living in Berlin, Germany. Finn is running the 2024 Berlin Marathon for the Visual Snow Initiative to raise awareness and funds for research into Visual Snow Syndrome. You can donate directly to his fundraiser <a href={projectLinks.marathonDonationLink || projectLinks.vsiDonationLink} target="_blank" className="text-blue-500 hover:text-blue-600">here</a>.
                </p>
                {/* Links to deve,op github and project code */}
                <div className="flex mt-4">
                    <a href={projectLinks.developersGithub} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                        <FaGithub className="w-6 h-6 mr-1" />
                        Developer's GitHub
                    </a>
                    <a href={projectLinks.projectGithub} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600 ml-4">
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
                            Contact Developer
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}